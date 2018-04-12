import { IRNG } from '../';
import { multiplexer, seq } from '../../r-func';

export abstract class IRNGNormal {
  protected rng: IRNG;
  constructor(_rng: IRNG) {
    this.rng = _rng;
    this.unif_rand = this.unif_rand.bind(this);
    this.norm_rand = this.norm_rand.bind(this);
    this.internal_norm_rand = this.internal_norm_rand.bind(this);
  }

  public norm_rand(n: number = 1): number|number[]{
    n = !n || n < 0 ? 1 : n;
    return multiplexer(seq()()(n))(() => this.internal_norm_rand());
  } 

  protected abstract internal_norm_rand(): number;

  public unif_rand(n: number = 1): number|number[] {
     return this.rng.unif_rand(n);
  }
}
