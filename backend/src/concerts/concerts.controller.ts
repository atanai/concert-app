import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { ReserveConcertDto } from './dto/reserve-concert.dto';
import { CancelConcertDto } from './dto/cancel-concert.dto';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) { }

  @Post()
  create(@Body() createConcertDto: CreateConcertDto) {
    return this.concertsService.create(createConcertDto);
  }

  @Get()
  findAll() {
    return this.concertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concertsService.findOne(+id);
  }

  @Post(':id/reserve')
  reserve(
    @Param('id') id: string,
    @Body() dto: ReserveConcertDto,
  ) {
    return this.concertsService.reserveSeat(+id, dto.userId);
  }

  @Post(':id/cancel')
  cancel(
    @Param('id') id: string,
    @Body() dto: CancelConcertDto,
  ) {
    return this.concertsService.cancelSeat(+id, dto.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concertsService.remove(+id);
  }
}
