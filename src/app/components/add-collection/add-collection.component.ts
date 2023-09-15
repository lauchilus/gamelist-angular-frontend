import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { AddCollections } from 'src/app/common/addcollections';
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
        const base64String = reader.result as string;
      this.imageBase64 = base64String.split(',')[1];
      };
    }
  }
  


  onSubmit() {
    const formData = this.addCollectionFormGroup.value;
    formData.addCollection.image = this.imageBase64;

    const theCollection = new AddCollections(formData.addCollection.name, formData.addCollection.description, this.imageBase64);

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
