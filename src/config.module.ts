import { DynamicModule } from '@nestjs/common';
import {
  dotenvLoader,
  selectConfig,
  TypedConfigModule,
} from 'nest-typed-config';
import { RootConfig } from './config';

export const ConfigModule: DynamicModule = TypedConfigModule.forRoot({
  schema: RootConfig,
  load: dotenvLoader({
    separator: '__',
    keyTransformer(key) {
      return key.toLowerCase();
    },
  }),
});

export const rootConfig = selectConfig(ConfigModule, RootConfig);
