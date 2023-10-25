import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { describe, it, expect, beforeEach } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'john@vallete.com',
            password: '123123'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash correctly the password', async () => {
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'john@vallete.com',
            password: 'passJohn123'
        })

        const isPasswordCorrectlyHashed = await compare('passJohn123', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with the same email twice', async () => {
        const email = 'john@vallete.com'

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: 'passJohn123'
        })

        expect(async () => {
            await registerUseCase.execute({
                name: 'John Doe 2',
                email,
                password: 'passJohn321'
            })
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})