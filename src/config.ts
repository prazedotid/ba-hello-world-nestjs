import { Type } from 'class-transformer';
import { Allow, ValidateNested } from 'class-validator';

export class MongoDBConfig {
  @Allow()
  public readonly uri: string;
}

export class RootConfig {
  @Type(() => MongoDBConfig)
  @ValidateNested()
  public readonly mongo!: MongoDBConfig;
}
