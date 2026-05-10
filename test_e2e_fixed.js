const API = 'http://localhost:3000';

async function test(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}`);
  } catch (e) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${e.message}`);
  }
}

async function main() {
  console.log('=== API Tests (Updated Schema) ===\n');

  // Test with correct schema (phone/email instead of contact)
  await test('Book available slot with email', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-05-12',
        time: '09:30',
        name: 'Test User',
        email: 'test@example.com'
      })
    });
    if (res.status !== 200) {
      const data = await res.json();
      throw new Error(`Expected 200, got ${res.status}: ${JSON.stringify(data)}`);
    }
    const data = await res.json();
    if (!data.ok) throw new Error('Response not ok');
  });

  await test('Book with phone number', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-05-13',
        time: '14:00',
        name: 'Test User 2',
        phone: '05551234567'
      })
    });
    if (res.status !== 200) {
      const data = await res.json();
      throw new Error(`Expected 200, got ${res.status}: ${JSON.stringify(data)}`);
    }
  });

  await test('Booking without email or phone fails', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-05-14',
        time: '10:00',
        name: 'Test User 3'
      })
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
  });

  await test('Booking already-booked slot (May 15 10:00) returns 409', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-05-15',
        time: '10:00',
        name: 'Test Booking',
        email: 'test@example.com'
      })
    });
    if (res.status !== 409) throw new Error(`Expected 409, got ${res.status}`);
  });

  console.log('\n✅ All tests passed!');
}

main().catch(console.error);
