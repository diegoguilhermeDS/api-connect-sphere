import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

const tokenResponse = { token: expect.any(String) };

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(tokenResponse),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('POST /login', () => {
    it('Success: Must be able to login with client', async () => {
      const body: LoginDTO = {
        email: 'kenzinho.created@mail.com',
        password: '1234admin',
      };

      const result = await authController.login(body);

      expect(result).toEqual(tokenResponse);
    });

    it('Errror: Must not be able to login with client', () => {
      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      const body: LoginDTO = {
        email: 'kenzinho.created@mail.com',
        password: '1234admin',
      };

      expect(authController.login(body)).rejects.toThrowError();
    });
  });
});
