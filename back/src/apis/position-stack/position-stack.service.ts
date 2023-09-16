import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PositionStackService {

  constructor(
    private readonly httpService: HttpService
  ){}

  async getLocation(params: { location: {latitude: string, longitude: string}, limit: number}) {
    const p = {
      access_key: process.env.POSTIION_STACK_API_KEY,
      query: `${params.location.latitude},${params.location.longitude}`,
      limit: 1
    };

    try {
      const res = await lastValueFrom(this.httpService.get(`http://api.positionstack.com/v1/reverse?access_key=${p.access_key}&query=${p.query}&limit=${p.limit}`))
      if(!res || res.data.data.length === 0)
        return null
      else 
        return JSON.stringify(res.data.data[0].label)
    } catch (error) {
      console.log(error.message)
    }
  }
}
