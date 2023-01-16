import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Function to create new note
const main = async () => {
    const newNote = await prisma.notes.create({
        data: {
            title: 'My new note',
            content: 'This is my note',
        }
    })
}

// Call the function and then catch errors and finally disconnect from the database (good practice)
main()
.catch(e => {
    throw e
})
.finally(async () => {
    await prisma.$disconnect()
})