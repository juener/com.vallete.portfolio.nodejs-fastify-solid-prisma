import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'


describe('Authenticate Use Case', () => {
    let usersRepository: InMemoryUsersRepository
    let authenticateUseCase: AuthenticateUseCase
    
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        authenticateUseCase = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {

        await usersRepository.create({
            name: 'John Doe',
            email: 'john@vallete.com',
            password_hash: await hash('passJohn123', 6)
        })

        const { user } = await authenticateUseCase.execute({
            email: 'john@vallete.com',
            password: 'passJohn123'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {

        // no user has been created

        expect(async () => {
            await authenticateUseCase.execute({
                email: 'no-registered-email@vallete.com',
                password: 'passJohn123'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'john@vallete.com',
            password_hash: await hash('passJohn123', 6)
        })

        expect(async () => {
            await authenticateUseCase.execute({
                email: 'john@vallete.com',
                password: 'thisPasswordIsWrong'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})