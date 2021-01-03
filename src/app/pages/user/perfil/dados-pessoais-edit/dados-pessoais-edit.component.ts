import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/Auth/Auth.service';
import { MensagemSnackbarComponent } from 'src/app/shared/components/mensagem-snackbar/mensagem-snackbar.component';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { IUser } from 'src/app/shared/models/IUser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dados-pessoais-edit',
  templateUrl: './dados-pessoais-edit.component.html',
  styleUrls: ['./dados-pessoais-edit.component.scss']
})
export class DadosPessoaisEditComponent implements OnInit {

  public DadosForm: FormGroup;
  public ContatosForm: FormGroup;
  public Atualizando = false;
  public step = 0;
  public User: IUser;
  private Email: string;

  constructor(private fb: FormBuilder,
              public router: Router,
              private authService: AuthService,
              private snackbar: SnackbarComponent,
              private mensagemSnackbar: MensagemSnackbarComponent) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem(environment.VariavelUsuario))
    this.ValidationDados(user);
    this.ValidationContatos(user);
  }


  ValidationDados(user: IUser): void {
    this.DadosForm = this.fb.group({
      fullname: [{value: user.fullName, disabled: false}, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
      cpf: [{value: user.cpf, disabled: false}, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      dataNascimento: [{value: user.dataNascimento, disabled: false}, [Validators.required, Validators.minLength(10)]]
    });
  }

  ValidationContatos(user: IUser): void {
    this.ContatosForm = this.fb.group({
      phoneNumber: [{value: user.phoneNumber, disabled: false}, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: [{value: user.email, disabled: true}, [Validators.required, Validators.email]]
    });

    this.Email = user.email;
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  Atualizar() {
    const user = JSON.parse(localStorage.getItem(environment.VariavelUsuario))

    if (this.DadosForm.valid && this.ContatosForm.valid) {
      this.Atualizando = true;
      this.User = {
        id: user.id,
        fullName: this.DadosForm.value.fullname,
        cpf: this.DadosForm.value.cpf,
        dataNascimento: `${this.DadosForm.value.dataNascimento}`,
        phoneNumber: this.ContatosForm.value.phoneNumber,
        email: this.Email
      };

      this.authService.Put(this.User).subscribe(
        () => {
          this.Atualizando = false;
          this.snackbar.OpenSnackBarSuccess(this.mensagemSnackbar.AtualizacaoConcluida);
          this.router.navigate(['/user/perfil/dados']);
        },
        error => {
          this.Atualizando = false;
          const erro = error.error;
          console.log(error);
          switch (erro) {
            case 'Usuario não encontrado!':
              this.snackbar.OpenSnackBarError(this.mensagemSnackbar.EmailNaoEncontrado);
              break;
            default:
              this.snackbar.OpenSnackBarError(this.mensagemSnackbar.ErroServidor);
              break;
          }
        });
    } else {
      this.snackbar.OpenSnackBarError(this.mensagemSnackbar.ErroCamposPreenchidos);
    }
  }
}
