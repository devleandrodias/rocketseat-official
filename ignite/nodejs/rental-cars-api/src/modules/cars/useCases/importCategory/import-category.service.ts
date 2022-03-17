import { createReadStream, promises } from "fs";
import { parse } from "csv-parse";
import { ICategoryRepository } from "../../repositories/interfaces/category.repository.interfaces";

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  private loadCategories(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (chunk) => {
          const [name, description] = chunk;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
          promises.unlink(file.path);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(({ name, description }) => {
      const existsCategory = this.categoryRepository.findByName(name);

      if (!existsCategory) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}
