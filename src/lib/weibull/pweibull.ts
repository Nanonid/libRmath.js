/*  AUTHOR
 *  Jacob Bogers, jkfbogers@gmail.com
 *  March 18, 2017
 *
 * ORIGNAL AUTHORS
 *  Mathlib : A C Library of Special Functions
 *  Copyright (C) 1998 Ross Ihaka
 *  Copyright (C) 2000-2015 The R Core Team
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, a copy is available at
 *  https://www.R-project.org/Licenses/
 *
 *  DESCRIPTION
 *
 *    The distribution function of the Weibull distribution.
 */
import * as debug from 'debug';

import { ML_ERR_return_NAN, R_D_exp, R_DT_0 } from '../common/_general';

import { R_Log1_Exp } from '../exp/expm1';

import { multiplexer } from '../r-func';

const { expm1, pow } = Math;
const { isNaN: ISNAN } = Number;
const printer = debug('pweibull');

export function pweibull<T>(
  xx: T,
  shape: number,
  scale: number = 1,
  lower_tail: boolean = true,
  log_p: boolean = false
): T {
  return multiplexer(xx)(x => {
    if (ISNAN(x) || ISNAN(shape) || ISNAN(scale)) return x + shape + scale;

    if (shape <= 0 || scale <= 0) return ML_ERR_return_NAN(printer);

    if (x <= 0) {
      return R_DT_0(lower_tail, log_p);
    }
    x = -pow(x / scale, shape);
    return lower_tail ? (log_p ? R_Log1_Exp(x) : -expm1(x)) : R_D_exp(log_p, x);
  }) as any;
}
