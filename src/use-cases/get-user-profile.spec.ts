import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

describe('Get User Profile Use Case', () => {
    let usersRepository: InMemoryUsersRepository
    let getUserProfileUseCase: GetUserProfileUseCase

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get the user profile using the userId', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'john@vallete.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await getUserProfileUseCase.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('John Doe')
    })

    it('should not be able to get the user profile with wrong userId', async () => {
        expect(async () => {
            await getUserProfileUseCase.execute({
                userId: 'non-existing-id'
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})