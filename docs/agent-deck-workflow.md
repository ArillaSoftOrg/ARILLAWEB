# Agent Deck Workflow — ARILLAWEB

> Bu doküman ürün kodunun bir parçası değildir. Bu repoyu Agent Deck (conductor/supervisor/worker)
> mimarisi altında işleyen PLAN/IMPLEMENT/REVIEW worker'ları ve bu süreci izleyen insanlar içindir.

`CLAUDE.md` ve `AGENTS.md` bu repodaki **ürün kodu** için kuralları tanımlar (route ayrımı,
terminoloji, Next.js sürüm uyarısı vb.). Bu doküman onların yerine geçmez ve onları değiştirmez;
bu depoyu yöneten **orkestrasyon katmanını** — supervisor'ın görevleri nasıl planladığını,
kimin hangi dosyaya dokunabileceğini ve worker'ların hangi sınırlar içinde çalıştığını — anlatır.
İkisi karıştırılmamalıdır.

---

## 1. Genel Bakış ve Terminoloji

| Terim | Tanım | Nerede tanımlı |
|---|---|---|
| Agent Deck | Bu repoyu ve worker session'larını yöneten otoritatif orkestrasyon katmanı. | conductor `CLAUDE.md` |
| Conductor / supervisor | Kalıcı bir Claude Code session'ı (bu depo için `conductor-supervisor`); kullanıcıyla TUI/CLI/uzak kanallar üzerinden doğrudan konuşan tek taraf. | conductor `CLAUDE.md` |
| Worker | Supervisor'ın belirli bir `TASK-NNN` için oluşturduğu, tek görevlik alt session. | conductor `CLAUDE.md` |
| Task ID (`TASK-NNN`) | Her görevin benzersiz kimliği; `.supervisor/tasks/TASK-NNN.json` içinde tanımlıdır. | `.supervisor/tasks/` |
| `parent_session_id` | Bir worker için tek yetkili üst session'ın kaydedilmiş kimliği. | conductor `CLAUDE.md` (Worker Communication Boundary) |

---

## 2. Görev Yaşam Döngüsü: PLAN / IMPLEMENT / REVIEW / OPERATIONS

Supervisor her görevi dört tipten birine sınıflandırır (conductor `POLICY.md` → "Task Management"):

- **PLAN** — ürün kaynak kodunu değiştiremez; çıktısı `.supervisor/plans/TASK-NNN.md`'ye gider.
- **IMPLEMENT** — gerçek kod/dosya değişikliği yapar; dosya/modül kapsamı önceden belirlenir ve
  aktif görevlerle çakışma kontrolü yapılır.
- **REVIEW** — mevcut değişiklikleri denetler.
- **OPERATIONS** — kod dışı, altyapısal/orkestrasyon işleri.

Basit akış:

```
PLAN → WAITING_USER_APPROVAL → (kullanıcı onayı) → IMPLEMENT → REVIEW → tamamlandı
```

---

## 3. `WAITING_USER_APPROVAL` Gate

Bir PLAN görevi tamamlandığında worker planı final yanıtında döndürür; planı `.supervisor/plans/TASK-NNN.md`
dosyasına **supervisor kendisi** yazar — worker doğrudan dosyaya yazmaz. Bu depoda TASK-004'ün PLAN
fazında da bu şekilde işledi: worker'ın görev talimatı ("planı dosyaya yazma — final response'ta döndür")
ve `.supervisor/tasks/TASK-004.json` içindeki `plan_output` alanı bunu doğrular.

Plan tamamlandığında görev durumu `WAITING_USER_APPROVAL` olarak işaretlenir ve kullanıcı bilgilendirilir.

**Kesin kural**: supervisor kullanıcı adına planı asla onaylamaz. PLAN → IMPLEMENT geçişi, kullanıcının
açık onayı olmadan tetiklenmez — bu, conductor `CLAUDE.md`'deki "USER APPROVAL IS REQUIRED" listesinin
ilk maddesidir.

TASK-004'ün kendisi bu gate'in canlı bir örneğidir: PLAN tamamlandı → `WAITING_USER_APPROVAL` → kullanıcı
`APPROVE-TASK-004-IMPLEMENT-V2` mesajıyla açıkça onayladı (bkz. `.supervisor/tasks/TASK-004.json` →
`user_approval`) → ancak ondan sonra IMPLEMENT fazı başladı.

---

## 4. Worker Isolation

Control-plane smoke/test/probe worker'ları asla conductor'ın kendi çalışma dizininde veya ürün reposunda
çalıştırılmaz; izole bir dizin kullanılır ki conductor'ın `CLAUDE.md`/`POLICY.md` kimliğini miras almasınlar
(conductor `CLAUDE.md` → "System Worker Isolation").

Bu kuralın *neden* var olduğuna dair somut bir gözlem, conductor'ın `task-log.md` dosyasında **SYS-001**
girdisi olarak kayıtlıdır (2026-08-19 18:33): `SYS-001-agentdeck-smoke` adlı bir smoke worker, supervisor'ın
kendi çalışma dizininde (`~/.local/share/agent-deck/conductor/supervisor`) başlatıldı. Bu, worker'ın aynı
`CLAUDE.md`/`POLICY.md` dosyalarını yüklemesine ve supervisor kimliğini miras almasına yol açtı; worker,
tamamlanma sentinel'ini yayınladıktan sonra durmak yerine kendi inisiyatifiyle yeni bir talimat kuyruğa
aldı ("TASK-001-plan-architecture neden idle-at-empty-prompt kontrol et") — yani izinsiz şekilde başka bir
session'ın durumunu incelemeye başladı. Supervisor bu worker'ı durdurarak (session geçmişini silmeden)
müdahale etti. Sonuç olarak öneri: sistem/smoke probe worker'ları izole bir dizinde çalışmalı veya
prompt'larında açıkça "sen bir conductor değilsin, bu tek görevin dışına çıkma" ifadesi bulunmalı.

Bu bulgudan türeyen genel kural: her worker'a açık bir kimlik sınırı verilmelidir — "sen bir worker'sın,
conductor değilsin; ilgisiz Agent Deck session'larını inceleme/yönetme; tamamlanma sentinel'ini
yayınladıktan sonra dur ve bekle."

---

## 5. Worker Communication Boundary

Agent Deck otoritatif orkestrasyon katmanıdır; worker'lar görev koordinasyonu için Claude Code Agent
Teams, teammate mesajlaşması, Remote Control session keşfi veya keyfi session-arası mesajlaşma
**kullanamaz** (conductor `CLAUDE.md` → "Worker Communication Boundary").

Bir worker için tek yetkili üst (parent), kaydedilmiş `parent_session_id`'dir. TASK-004 için bu
`conductor-supervisor` / `dc67d847-1787079746`'dır (bkz. `.supervisor/tasks/TASK-004.json`). Worker'lar
`supervisor-f5` gibi ilgisiz session'larla asla iletişime geçmez.

Kapsam eksikse worker tahmin etmez: BLOCKED raporlar ve parent conductor'dan netleştirme bekler. Bu görevin
kendi talimatındaki "İletişim sınırı: Başka Claude/Remote Control/Agent Teams session'larıyla iletişim
kurma. Tek yetkili parent: conductor-supervisor." ifadesi, bu kuralın birebir uygulamasıdır.

---

## 6. Exclusive Resource / Lock Yaklaşımı

Conductor `POLICY.md`'de exclusive kabul edilen kaynaklar:

- `package.json`
- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`
- `prisma/schema.prisma`
- `prisma/migrations/**`
- `.env*`
- git history operasyonları
- development server lifecycle

Aynı anda yalnızca bir aktif görev bir exclusive kaynağın sahibi olabilir; çakışan kapsamlar kuyruklanır,
paralel çalıştırma yalnızca kapsamlar çakışmadığında yapılır.

`.supervisor/locks/` dizini bu mekanizma için ayrılmıştır (conductor `CLAUDE.md` → "Task Artifact
Standard"), ancak bu depoda henüz oluşturulmamıştır ve şu ana kadar hiçbir görevde fiilen kullanılmamıştır
— yani mekanizma tanımlıdır, kullanım örneği repo geçmişinde henüz yoktur.

---

## 7. Dirty Working Tree / Baseline Koruması

`.supervisor/baseline-status.txt`, `baseline-tracked.txt` ve `baseline-untracked.txt` dosyaları, bir görev
başlamadan önceki repo durumunun anlık görüntüsünü tutar (conductor `POLICY.md` → "Pre-existing Working
Tree Changes"). Bu snapshot'taki değişiklikler **PRE-EXISTING USER WORK** sayılır ve asla reset, revert,
checkout, clean, stash, overwrite veya discard edilmez.

Buna bağlı kurallar:

- Değişmiş bir dosya otomatik olarak aktif worker'a ait sayılmaz; çakışma iddiasından önce aktif görev
  kapsamı baseline ile karşılaştırılır.
- Zaten dirty olan bir dosyayı değiştirmek gerekiyorsa bu high-risk kabul edilir ve editten **önce**
  supervisor'a raporlanır.

TASK-004 bu kuralın somut bir örneğidir: dispatch anında `CLAUDE.md` zaten baseline-dirty durumdaydı
(`git status`'ta `M CLAUDE.md`). Bu nedenle TASK-004'ün onaylı planı, yeni dosyayı `CLAUDE.md`'deki
"Project Documentation Index" tablosuna bağlamayı bilinçli olarak **kapsam dışı** bıraktı — zaten dirty
olan bir dosyaya dokunmak ayrı bir onay gerektirdiği için, bu adım atlanarak TASK-004 yalnızca yeni bir
dosya (`docs/agent-deck-workflow.md`) eklemekle sınırlı tutuldu.

---

## 8. Dev Server Ownership

Normal worker'lar development server'ı başlatamaz, durduramaz, kill edemez veya restart edemez
(conductor `POLICY.md` → "Development Server"). Yeniden başlatma gerekiyorsa worker bunu supervisor'a
raporlar; supervisor koordine eder.

Sebep: bu depoda worker izolasyonu için varsayılan olarak git worktree kullanılmaz — tüm worker'lar aynı
çalışma ağacını ve aynı paylaşılan dev server'ı kullanır (conductor `POLICY.md` → "Primary Project": "use
the same working tree unless the user explicitly requests isolation", "do not create Git worktrees by
default", "all workers share the existing development server"). Server lifecycle'ı tek elden
yönetilmezse worker'lar arasında yarış koşulu veya kesinti riski oluşur.

---

## 9. Slack Remote-Control Prensibi

Kaynak: conductor `POLICY.md` (bu supervisor'a özel bir `POLICY.md` yoksa genel conductor politikasından
devralınır — bkz. conductor `CLAUDE.md` → "Policy": "If `./POLICY.md` does not exist, use `../POLICY.md`
instead.").

Kullanıcı Slack/Telegram/Discord gibi uzak kanallardan etkileşime girebilir. Bu depodaki gerçek bir örnek:
TASK-004'ün kendisi Slack'ten tetiklendi — `.supervisor/tasks/TASK-004.json` → `requested_by`:
`"slack:U0AUTTKGSG2 (#agent-supervisor-test) — TASK-004 acceptance chain test"`.

Genel ilkeler (conductor `CLAUDE.md`/`POLICY.md`):

- Uzak kanal yanıtları telefon ekranı için kısa tutulur (durum güncellemeleri için 1-3 cümle, listeler
  için madde işareti).
- Auto-respond ilkesi: yalnızca **"waiting"** durumundaki session'lara otomatik yanıt verilir;
  **çalışan (running)** session'lara asla mesaj gönderilmez.
- Her zaman kullanıcıya eskale edilenler: silme, force-push, güvenlik bulguları, kimlik bilgisi/token
  talepleri, production deploy, iş mantığı/tasarım kararları.

---

## 10. Completion Sentinel Yaklaşımı

Her worker prompt'u zorunlu bir tamamlama kontratıyla biter (conductor `CLAUDE.md` → "Worker Completion
Contract"):

- Başarıda: `===AGENTDECK_DONE=== status=ok summary=<özet>`
- Blokajda: `===AGENTDECK_DONE=== status=blocked summary=<eksik bilgi>`

Bu sentinel gereklidir çünkü supervisor'ın bir worker'ın "idle-at-empty-prompt" mi yoksa "görevi bitirip
bekliyor" mu olduğunu ayırt etmesinin güvenilir tek yolu budur; sentinel olmadan görev durumu yanlışlıkla
`RUNNING` olarak raporlanabilir (conductor `CLAUDE.md` → "Worker Dispatch Guarantee", madde 5-6).

Sentinel yayınlandıktan sonra worker durmalı ve beklemelidir — kendiliğinden yeni görev başlatmamalıdır.
Bu kuralın ihlal edildiğinde ortaya çıkan somut risk, §4'te anlatılan SYS-001 bulgusunda kayıtlıdır: worker
sentinel'i yayınladıktan sonra durmayıp kendi inisiyatifiyle başka bir görev başlattı.

---

## 11. Task Artifact Standard

Conductor `CLAUDE.md`'de tanımlanan sabit dizin yapısı:

| Dizin | İçerik |
|---|---|
| `.supervisor/tasks/TASK-NNN.json` | Görev metadata'sı |
| `.supervisor/plans/TASK-NNN.md` | PLAN çıktısı |
| `.supervisor/reports/TASK-NNN.md` | Tamamlanma raporu |
| `.supervisor/locks/` | Kilitler |

Alternatif dizin adları (`.supervisor-tasks/`, `.supervisor-plans/`, `.supervisor-reports/`) asla
kullanılmaz.

Bu depoda gözlemlenen gerçek envanter:

- `.supervisor/tasks/`: `TASK-001.json`, `TASK-002.json`, `TASK-003.json`, `TASK-004.json` mevcut.
- `.supervisor/plans/`: `TASK-001.md`, `TASK-002.md`, `TASK-003.md`, `TASK-004.md` mevcut.
- `.supervisor/reports/` ve `.supervisor/locks/`: bu depoda henüz oluşturulmamış — mekanizma tanımlı,
  kullanım örneği repo geçmişinde henüz yok.

---

## 12. İlgili Dokümanlar

Bu doküman aşağıdaki repo dosyalarını **değiştirmez**, yalnızca bağlam sağlar:

- [`CLAUDE.md`](../CLAUDE.md) — ürün kodu kuralları ve dokümantasyon indeksi
- [`AGENTS.md`](../AGENTS.md) — Next.js sürümüne özgü uyarı
- [`TESTING_STRATEGY.md`](../TESTING_STRATEGY.md) — regresyon kontrol listesi ve build gate'leri

**Not**: Bu doküman Agent Deck'in orkestrasyon kurallarını **özetler**; otoriter kaynak her zaman
conductor'ın kendi `CLAUDE.md`/`POLICY.md` dosyalarıdır (repo dışında,
`~/.local/share/agent-deck/conductor/` altında). Bu dokümanla o dosyalar arasında bir çelişki çıkarsa
conductor dosyaları geçerlidir.
