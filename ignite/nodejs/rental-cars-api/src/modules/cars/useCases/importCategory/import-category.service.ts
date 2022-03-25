import { parse } from "csv-parse";
import { inject, injectable } from "tsyringe";
import { createReadStream, promises } from "fs";
import { ICategoryRepository } from "../../repositories/interfaces/category.repository.interfaces";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

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

    categories.map(async ({ name, description }) => {
      const existsCategory = await this.categoryRepository.findByName(name);

      if (!existsCategory) {
        await this.categoryRepository.create({ name, description });
      }
    });
  }
}
