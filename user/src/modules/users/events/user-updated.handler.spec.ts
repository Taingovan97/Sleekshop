import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdatedHandler } from './user-updated.handler';

describe('UserUpdatedHandler', () => {
  let provider: UserUpdatedHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUpdatedHandler],
    }).compile();

    provider = module.get<UserUpdatedHandler>(UserUpdatedHandler);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
