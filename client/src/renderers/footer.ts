import { Doms } from '../constants';

export default async function render(meta: Meta) {
    try {
        Doms.FooterUpdatedAt.innerText = `Updated at ${new Date(meta.timestamp).toLocaleString()}`;
    } catch (error) {
        console.error(error);
    }
}
