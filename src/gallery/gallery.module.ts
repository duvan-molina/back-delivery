import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery])],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
