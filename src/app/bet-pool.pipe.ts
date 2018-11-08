import { Pipe, PipeTransform } from '@angular/core';
/*
Retourne une nouvelle liste qui contient des betPools en fonction de
justePrixModel et de variationModel.
*/
@Pipe({ name: 'betPools' })
export class BetPoolPipe implements PipeTransform {
  transform(pools: any[], justePrixModel: boolean, variationModel: boolean) {
    if(justePrixModel && variationModel)
        return pools.filter(pool => pool.pooltype == true || pool.pooltype == false)
    if(!justePrixModel && variationModel)
        return pools.filter(pool => pool.pooltype == false)
    if(justePrixModel && !variationModel)
        return pools.filter(pool => pool.pooltype == true)
    return [];
    ;
  }
}