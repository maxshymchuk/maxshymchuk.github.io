import { Doms } from '../constants';

function Footer(meta: Meta): void {
    Doms.FooterUpdatedAt.innerText = `Updated at ${new Date(meta.timestamp).toLocaleString()}`;
}

export { Footer };
