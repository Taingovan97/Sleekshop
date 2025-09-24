import { Test, TestingModule } from '@nestjs/testing';
import { UserCreatedHandler } from './user-created.handler';

describe('UserCreatedHandler', () => {
  let provider: UserCreatedHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCreatedHandler],
    }).compile();

    provider = module.get<UserCreatedHandler>(UserCreatedHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
