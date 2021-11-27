import { MoverItem } from './mover-item.model';

export interface Mover {
  actives: MoverItem[];
  losers: MoverItem[];
  winners: MoverItem[];
}
