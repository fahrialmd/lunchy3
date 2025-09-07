import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Starting seed...')

    // Seed Item Statuses
    console.log('Creating item statuses...')
    await prisma.itemStatus.createMany({
        data: [
            { code: 'P', name: 'Paid', descr: 'Item has been paid' },
            { code: 'U', name: 'Unpaid', descr: 'Item is unpaid' }
        ],
        skipDuplicates: true
    })

    // Seed Order Statuses  
    console.log('Creating order statuses...')
    await prisma.orderStatus.createMany({
        data: [
            { code: 'O', name: 'Open', descr: 'Order is open' },
            { code: 'C', name: 'Close', descr: 'Order is closed' },
            { code: 'A', name: 'Cancel', descr: 'Order is cancelled' }
        ],
        skipDuplicates: true
    })

    console.log('Seed data created successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })