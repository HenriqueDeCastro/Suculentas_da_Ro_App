import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/core/services/Categoria/Categoria.service';
import { ProdutoService } from 'src/app/core/services/Produto/Produto.service';
import { FiltroProdutosComponent } from 'src/app/shared/components/filtro-produtos/filtro-produtos.component';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { ICategoria } from 'src/app/shared/models/ICategoria';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-geralProdutos',
  templateUrl: './geralProdutos.component.html',
  styleUrls: ['./geralProdutos.component.scss']
})
export class GeralProdutosComponent implements OnInit {

  Categorias: ICategoria[];
  link: string;

  constructor(public router: Router,
              private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private bottomSheet: MatBottomSheet,
              private snackbar: SnackbarComponent) { }

  ngOnInit(): void {
    this.ReceberCategorias();
    this.link = environment.UrlApi;
  }

  ReceberCategorias(): void {
    this.categoriaService.GetAll().subscribe((categorias: ICategoria[]) => {
      this.Categorias = categorias;
    },
    erro => {
      console.log(erro);
      this.snackbar.OpenSnackBarError('Erro no servidor, tente novamente mais tarde !!!');
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(FiltroProdutosComponent);
  }
}
