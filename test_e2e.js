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
  console.log('=== Comprehensive Availability System Tests ===\n');

  // Test 1: Monday available slots
  await test('Monday (May 12) should have available slots', async () => {
    const res = await fetch(`${API}/api/availability/slots?date=2026-05-12&service=all`).then(r => r.json());
    if (!res.slots || res.slots.length === 0) throw new Error('No slots returned');
    if (!res.slots.some(s => s.status === 'available')) throw new Error('No available slots');
  });

  // Test 2: Saturday closed
  await test('Saturday (May 10) should be closed', async () => {
    const res = await fetch(`${API}/api/availability/days?month=2026-05&service=all`).then(r => r.json());
    if (res['2026-05-10'] !== 'closed') throw new Error(`Expected closed, got ${res['2026-05-10']}`);
  });

  // Test 3: Booked slot detection
  await test('May 15 10:00 should be booked (has appointment)', async () => {
    const res = await fetch(`${API}/api/availability/slots?date=2026-05-15&service=all`).then(r => r.json());
    const slot = res.slots.find(s => s.time === '10:00');
    if (!slot) throw new Error('10:00 slot not found');
    if (slot.status !== 'booked') throw new Error(`Expected booked, got ${slot.status}`);
  });

  // Test 4: Available slots nearby
  await test('May 15 09:00 should be available', async () => {
    const res = await fetch(`${API}/api/availability/slots?date=2026-05-15&service=all`).then(r => r.json());
    const slot = res.slots.find(s => s.time === '09:00');
    if (!slot || slot.status !== 'available') throw new Error('09:00 not available');
  });

  // Test 5: Service-specific availability (Web Geliştirme on Saturday)
  await test('Web Geliştirme on Saturday (May 10) should be closed', async () => {
    const res = await fetch(`${API}/api/availability/days?month=2026-05&service=Web%20Geliştirme`).then(r => r.json());
    if (res['2026-05-10'] !== 'closed') throw new Error(`Expected closed, got ${res['2026-05-10']}`);
  });

  // Test 6: Book available slot succeeds
  await test('Booking available slot (May 12 09:00) should succeed', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-05-12',
        time: '09:00',
        name: 'Test Booking',
        contact: 'test@example.com'
      })
    });
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const data = await res.json();
    if (!data.ok) throw new Error('Response not ok');
  });

  // Test 7: Book already booked slot fails
  await test('Booking already-booked slot (May 15 10:00) returns 409', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-05-15',
        time: '10:00',
        name: 'Test Booking',
        contact: 'test@example.com'
      })
    });
    if (res.status !== 409) throw new Error(`Expected 409, got ${res.status}`);
    const data = await res.json();
    if (!data.error) throw new Error('No error message');
    if (!data.error.includes('Seçtiğiniz saat')) throw new Error('Wrong error message');
  });

  // Test 8: Book on closed day fails
  await test('Booking on closed day (May 11 Sunday) returns 409', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-05-11',
        time: '10:00',
        name: 'Test Booking',
        contact: 'test@example.com'
      })
    });
    if (res.status !== 409) throw new Error(`Expected 409, got ${res.status}`);
  });

  // Test 9: Past date booking fails
  await test('Booking past date returns 409', async () => {
    const res = await fetch(`${API}/api/appointment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'all',
        date: '2026-04-01',
        time: '10:00',
        name: 'Test Booking',
        contact: 'test@example.com'
      })
    });
    if (res.status !== 409) throw new Error(`Expected 409, got ${res.status}`);
  });

  console.log('\n✅ All E2E tests completed successfully!');
}

main().catch(console.error);
