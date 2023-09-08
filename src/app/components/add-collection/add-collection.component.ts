import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Collections } from 'src/app/common/collections';
import { GameService } from 'src/app/services/game-service.service';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit{


  addCollectionFormGroup: FormGroup;
  imageBase64: string | null = null;
  selectedFile: File | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private service: GameService
  ){}


  ngOnInit(): void {
    this.addCollectionFormGroup = this.formBuilder.group({
      addCollection: this.formBuilder.group({
        name: [''],
        description: [''],
        image: [null]
      })
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        // Corrige la asignación al campo 'image' del formulario
      };
    }
  }
  


  onSubmit() {
    const formData = this.addCollectionFormGroup.value;
    formData.addCollection.image = this.imageBase64;

    const theCollection = new Collections(formData.addCollection.name, formData.addCollection.description, formData.addCollection.image);

    this.service.postCollection(theCollection)
      .subscribe(response => {
        // Maneja la respuesta del servicio si es necesario
        console.log('Respuesta del servicio:', response);
      }, error => {
        // Maneja cualquier error del servicio
        console.error('Error en el servicio:', error);
      });
  }

}
