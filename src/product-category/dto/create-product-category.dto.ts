import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
