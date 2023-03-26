import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import GetProductsArgs from './product.args_.type';
import shuffle from 'src/helpers/shuffle';
import search from 'src/helpers/search';
import ProductsConnection from './product.type';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => ProductsConnection, { description: 'Get all the products' })
  async products(
    @Args()
    { limit, offset, searchText }: GetProductsArgs,
  ) {
    let products = await this.productsService.findAll();

    products = shuffle(products);

    products = await search(products, ['name'], searchText);
    const hasMore = products.length > offset + limit;

    return {
      items: products.slice(offset, offset + limit),
      totalCount: products.length,
      hasMore,
    };
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('productId', { type: () => ID }) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
