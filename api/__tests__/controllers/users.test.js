const { UserRegister } = require('../../services/usersService');
const { argonHash, argonVerify } = require('../../utils/hash');

const mockRequest = {

};

const mockNext = {

};

const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
}

jest.mock('../../utils/hash', () => ({
    argonHash: jest.fn((pw) => `hashed_${pw}`),
}))

describe("registerUser", () => {

    it("should return a user object", async () => {
        await UserRegister(mockRequest, mockResponse, mockNext);
        expect(mockResponse.send).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalled();
    })
})