interface BookEntry {
  title: string;
  cover_url: string;
  page_url: string;
}

interface Book extends BookEntry {
  descriptions: string;
  preview_pages: string[];
  download_url: string;
}

export { Book, BookEntry };
