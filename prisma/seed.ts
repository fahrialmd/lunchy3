import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const users = [
    { userName: 'Achmad Fahri Alhamdi', userEmpID: '47825', roles: ['ADMIN', 'BUYER', 'VERIFIED'] },
    { userName: 'John Smith', userEmpID: '12345', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Jane Johnson', userEmpID: '23456', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Mike Wilson', userEmpID: '34567', roles: ['VERIFIED'] },
    { userName: 'Sarah Davis', userEmpID: '45678', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Tom Brown', userEmpID: '56789', roles: ['VERIFIED'] },
    { userName: 'Emma Garcia', userEmpID: '67890', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Alex Rodriguez', userEmpID: '78901', roles: ['VERIFIED'] },
    { userName: 'Lisa Chen', userEmpID: '89012', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'David Miller', userEmpID: '90123', roles: [] },
    { userName: 'Anna Taylor', userEmpID: '21234', roles: ['VERIFIED'] },
    { userName: 'Olivia Martinez', userEmpID: '11223', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'William Lee', userEmpID: '22334', roles: ['VERIFIED'] },
    { userName: 'Sophia Harris', userEmpID: '33445', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'James Clark', userEmpID: '44556', roles: ['VERIFIED'] },
    { userName: 'Benjamin Lewis', userEmpID: '55667', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Mia Walker', userEmpID: '66778', roles: ['VERIFIED'] },
    { userName: 'Charlotte Young', userEmpID: '77889', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Henry King', userEmpID: '88990', roles: ['VERIFIED'] },
    { userName: 'Amelia Scott', userEmpID: '99001', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Lucas Adams', userEmpID: '10112', roles: ['VERIFIED'] },
    { userName: 'Ethan Turner', userEmpID: '20234', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Grace Evans', userEmpID: '30345', roles: ['VERIFIED'] },
    { userName: 'Ava Carter', userEmpID: '40456', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Noah Mitchell', userEmpID: '50567', roles: ['VERIFIED'] },
    { userName: 'Lily Perez', userEmpID: '60678', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Mason Rivera', userEmpID: '70789', roles: ['VERIFIED'] },
    { userName: 'Ella Cooper', userEmpID: '80890', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Logan Bailey', userEmpID: '90901', roles: ['VERIFIED'] },
    { userName: 'Harper Morris', userEmpID: '11234', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Jack Murphy', userEmpID: '22345', roles: ['VERIFIED'] },
    { userName: 'Daniel White', userEmpID: '33456', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Chloe Martin', userEmpID: '44567', roles: ['VERIFIED'] },
    { userName: 'Matthew Hall', userEmpID: '55678', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Isabella Allen', userEmpID: '66789', roles: ['VERIFIED'] },
    { userName: 'Samuel Wright', userEmpID: '77890', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Emily Baker', userEmpID: '88901', roles: ['VERIFIED'] },
    { userName: 'Christopher Green', userEmpID: '99012', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Abigail Hill', userEmpID: '10123', roles: ['VERIFIED'] },
    { userName: 'Joseph Scott', userEmpID: '20245', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Natalie Adams', userEmpID: '30356', roles: ['VERIFIED'] },
    { userName: 'Andrew Campbell', userEmpID: '40467', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Victoria Parker', userEmpID: '50578', roles: ['VERIFIED'] },
    { userName: 'Daniel Edwards', userEmpID: '60689', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Hannah Collins', userEmpID: '70790', roles: ['VERIFIED'] },
    { userName: 'Joshua Stewart', userEmpID: '80801', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Zoe Sanchez', userEmpID: '90912', roles: ['VERIFIED'] },
    { userName: 'Anthony Morris', userEmpID: '11245', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Madison Rogers', userEmpID: '22356', roles: ['VERIFIED'] },
    { userName: 'Ryan Reed', userEmpID: '33467', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Ella Kelly', userEmpID: '44578', roles: ['VERIFIED'] },
    { userName: 'Nathan Ward', userEmpID: '55689', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Scarlett Cox', userEmpID: '66790', roles: ['VERIFIED'] },
    { userName: 'Christian Gray', userEmpID: '77801', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Aria Foster', userEmpID: '88912', roles: ['VERIFIED'] },
    { userName: 'Jonathan Howard', userEmpID: '99023', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Ella Ramirez', userEmpID: '10134', roles: ['VERIFIED'] },
    { userName: 'Tyler Hughes', userEmpID: '20246', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Sofia Peterson', userEmpID: '30357', roles: ['VERIFIED'] },
    { userName: 'Owen Ross', userEmpID: '40468', roles: ['BUYER', 'VERIFIED'] },
    { userName: 'Chloe Price', userEmpID: '50579', roles: ['VERIFIED'] }
]

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

    // Seed Users
    console.log('Creating users...')
    const hashedPassword = await bcrypt.hash('password123', 12)
    const hashedMasterPassword = await bcrypt.hash('111111', 12)

    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        const avatarIndex = Math.floor(Math.random() * 6) + 1;
        try {
            await prisma.user.create({
                data: {
                    userName: user.userName,
                    userEmpID: user.userEmpID,
                    password: user.userEmpID === '47825' ? hashedMasterPassword : hashedPassword,
                    avatar: `/avatars/ava2${avatarIndex}.png`,
                    roles: user.roles as []
                }
            })
            console.log(`✅ Created user: ${user.userName} (${user.userEmpID})`)
        } catch (error) {
            console.log(`⚠️  User ${user.userEmpID} already exists, skipping...`)
        }
    }

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