const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const rules = await prisma.availabilityRule.findMany({
    orderBy: [{ dayOfWeek: 'asc' }, { service: 'asc' }]
  });
  
  const appointments = await prisma.appointmentRequest.findMany();
  
  console.log('=== Availability Rules ===');
  if (rules.length === 0) {
    console.log('(None - admin needs to initialize)');
  } else {
    rules.forEach(r => {
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][r.dayOfWeek];
      console.log(`${day} (${r.service}): ${r.isOpen ? `${r.startTime}-${r.endTime}, ${r.slotDuration}min` : 'CLOSED'}`);
    });
  }
  
  console.log('\n=== Appointments in Database ===');
  console.log(`Total count: ${appointments.length}`);
  appointments.forEach(a => {
    console.log(`  ${a.date} ${a.time} (${a.service}): ${a.name}`);
  });
  
  await prisma.$disconnect();
}

main().catch(console.error);
