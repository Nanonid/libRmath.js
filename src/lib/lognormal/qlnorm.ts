/* GNUv3 License

Copyright (c) Jacob K. F. Bogers <jkfbogers@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
import { R_Q_P01_boundaries } from '../common/_general';

import { qnorm } from '../normal/qnorm';
import { multiplexer } from '../r-func';

const { exp } = Math;
const { isNaN: ISNAN, POSITIVE_INFINITY: ML_POSINF } = Number;

export function qlnorm<T>(
  pp: T,
  meanlog: number = 0,
  sdlog: number = 1,
  lower_tail: boolean = true,
  log_p: boolean = false
): T {
  return multiplexer(pp)(p => {
    if (ISNAN(p) || ISNAN(meanlog) || ISNAN(sdlog)) return p + meanlog + sdlog;

    R_Q_P01_boundaries(lower_tail, log_p, p, 0, ML_POSINF);

    return exp(qnorm(p, meanlog, sdlog, lower_tail, log_p));
  }) as any;
}
