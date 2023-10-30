import { describe, beforeEach, it } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInRepository: InMemoryCheckInsRepository
let checkInUseCase: CheckInUseCase

describe('check-ins use case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository()
        checkInUseCase = new CheckInUseCase(checkInRepository)
    })

    // it('should create a new check in', async () => {
    //     const {checkIn} = await checkInUseCase.execute({
    //         // userId:, 
    //         // gymId: ,
    //     })
    // })
})