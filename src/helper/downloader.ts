import fs from 'fs';

export async function saveTxt(title: string, data: string) {
  fs.writeFile(`${title}.txt`, data, function (err) {
    if (err) {
      console.log(`${title} Error!`, err);
    }
  });
}
