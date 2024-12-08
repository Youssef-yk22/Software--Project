import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { Modules, ModulesSchema } from './models/modules.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Modules.name, schema: ModulesSchema }]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService],
})
export class ModulesModule {}
