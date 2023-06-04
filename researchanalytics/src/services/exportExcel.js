import { utils, writeFile } from 'xlsx';

export function exportAsExcel(articles){
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_json(ws, articles, { origin: 'A1', skipHeader: false });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Articles.xlsx');
}