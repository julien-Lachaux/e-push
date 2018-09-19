import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  
  valid: boolean = false;

  identity: any = {
    nom: 'Lachaux',
    prenom: 'Julien',
    age: 23,
    groupe_sanguin: 'AB',
    antecedant: 'porte des lunettes',
    allergie: 'chat'
  }
  
  type: string = 'accident';
  detail: string = 'voiture';
  adress: string = '3 rue de la poste, 78450 Villepreux';
  blesse: string = '1';
  victime: string = '0';
  contact: Array<string> = ['maman', 'papa', 'hugo', 'pauline'];
  destinataires: Array<string> = [];
  text: string = 'prévisualisation du message';
  
  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    private sms: SMS,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public params: NavParams
  ) {
  }
  
  sendSms() {
    if(this.valid === true) {
      this.sms.send('+33672164138', this.text);
      this.showAlert('smsDone');
    } else {
      this.showAlert('invalide');
    }
  }
  
  setNom(event) {
    this.identity.nom = event.value;
  }
  
  setPrenom(event) {
    this.identity.prenom = event.value;
  }
  
  setAge(event) {
    this.identity.age = event.value;
  }
  
  setGroupe_sanguin(event) {
    this.identity.groupe_sanguin = event.value;
  }
  
  setAntecedant(event) {
    this.identity.antecedant = event.value;
  }
  
  setAllergie(event) {
    this.identity.allergie = event.value;
  }
  
  setType(value) {this.type = value;}
  setDetail(value) {
    this.detail = value;
    this.valid = true;
  }
  setAdress(value) {
    this.adress = value;
    this.setText();
  }
  setBlesse(event) {
    this.blesse = event.target.value;
    this.setText();
  }
  
  setVictime(event) {
    this.victime = event.target.value;
    this.setText();
  }
  
  addDestinataire(event) {
    this.destinataires += event.target.innerText;
  }
  
  removeDestinataire(event) {
  this.destinataires.splice(this.destinataires.indexOf(event.target.innerText), 1);
  }
  
  getIdentity() {
    return this.identity;
  }
  
  setIdentity(params, value) {
    this.identity.$params = value;
  }
  
  setText() {
    
    this.text = 'Bonjour, je m\'appelle Julien lachaux,\n';
    
    if(this.type === 'accident') {
      this.text += ('je suis victime d\'un ' + this.type + ' de type : ');
    } else if(this.type === 'agression') {
      this.text += ('je suis victime d\'une ' + this.type + ' ');
    } else if(this.type === 'allergie') {
      this.text += ('je suis victime d\'une ' + this.type + ' ');
    } else if(this.type === 'terrorisme') {
      this.text += ('je suis témoin d\'une ');
    }
    
    this.text += (this.detail + ' à l\'adresse suivant :\n' + this.adress);
    
    this.text += ('\nLe nombre de blessé est de : ' + this.blesse);
    this.text += ('\nLe nombre de victime est de : ' + this.victime);
    
    this.text += '\n merci de me venir en aide au plus vite.';
  }
  
  showAlert(type) {
    
    let alert = this.alertCtrl.create();
    if(type === 'accident') {
      this.setType('accident');
      alert.setTitle('Type d\'accident');

      alert.addInput({
        type: 'radio',
        label: 'Sur route',
        value: 'route',
        handler: () => {
          this.setDetail('accident de la route');
        }
      });

      alert.addInput({
        type: 'radio',
        label: 'Domestique',
        value: 'vol',
        handler: () => {
          this.setDetail('domestique');
        }
      });
      
      alert.addInput({
        type: 'radio',
        label: 'Etouffement',
        value: 'etouffement',
        handler: () => {
          this.setDetail('');
        }
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: () => {
          this.setText();
        }
      });
    } else if(type === 'agression') {
      this.setType('agression');
      alert.setTitle('Type d\'agression');

      alert.addInput({
        type: 'radio',
        label: 'Physique',
        value: 'physique',
        handler: () => {
          this.setDetail('physique');
        }
      });

      alert.addInput({
        type: 'radio',
        label: 'Sexuelle',
        value: 'sexuelle',
        handler: () => {
          this.setDetail('sexuelle');
        }
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: () => {
          this.setText();
        }
      });
    } else if(type === 'allergie') {
      this.setType('allergie');
      alert.setTitle('Type d\'allergie');

      alert.addInput({
        type: 'radio',
        label: 'Alimentaire',
        value: 'alimentaire',
        handler: () => {
          this.setDetail('alimentaire');
        }
      });

      alert.addInput({
        type: 'radio',
        label: 'Respiratoire',
        value: 'respiratoire',
        handler: () => {
          this.setDetail('respiratoire');
        }
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: () => {
          this.setText();
        }
      });
    } else if(type === 'terrorisme') {
      this.setType('terrorisme');
      alert.setTitle('Type d\'attentat');

      alert.addInput({
        type: 'radio',
        label: 'Prise d\'otage',
        value: 'otage',
        handler: () => {
          this.setDetail('prise d\'otage');
        }
      });

      alert.addInput({
        type: 'radio',
        label: 'Fusillade',
        value: 'fusillade',
        handler: () => {
          this.setDetail('fusillade');
        }
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: () => {
          this.setText();
        }
      });
    } else if(type === 'proches') {
      alert.setTitle('Proches à prévenir');
      let tchecked = false;
      
      for(let i = 0; i < this.contact.length; i++) {
        if(this.destinataires.indexOf(this.contact[i]) !== -1) {
          tchecked = true;
        } else {
          tchecked = false;
        }
        alert.addInput({
            type: 'checkbox',
            label: this.contact[i],
            value: this.contact[i],
            checked: tchecked,
            handler: () => {
            }
          });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          this.destinataires = data;
        }
      });
    } else if(type === 'smsDone') {
      alert.setSubTitle('Les urgences sont prévenue');
      alert.setMessage('Ne bouger pas.');
    } else if(type === 'invalide') {
      alert.setSubTitle('Aucune donnée saisie');
      alert.setMessage('Veuillez complétez le formulaire');
    }
    alert.present()
  }
  
  showIdentity() {
    let identityModal = this.modalCtrl.create(ModalIdentity, this.identity);
    identityModal.present();
    identityModal.onDidDismiss(data => {
      if(data) {
        this.identity.nom = data.nom,
        this.identity.prenom = data.prenom,
        this.identity.age = data.age,
        this.identity.groupe_sanguin = data.groupe_sanguin,
        this.identity.antecedant = data.antecedant,
        this.identity.allergie = data.allergie
      }
    });
  }
  
}

@Component({
  templateUrl: 'identity.html' 
})
export class ModalIdentity {
   
  identity: any = {
    nom: '',
    prenom: '',
    age: undefined,
    groupe_sanguin: '',
    antecedant: '',
    allergie: ''
  }
   
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
      this.identity.nom = params.get('nom'),
      this.identity.prenom = params.get('prenom'),
      this.identity.age = params.get('age'),
      this.identity.groupe_sanguin = params.get('groupe_sanguin'),
      this.identity.antecedant = params.get('antecedant'),
      this.identity.allergie = params.get('allergie')
  }
  
  setNom(event) {
    this.identity.nom = event.target.value;
  }
  
  setPrenom(event) {
    this.identity.prenom = event.target.value;
  }
  
  setAge(event) {
    this.identity.age = event.target.value;
    console.log(this.identity);
  }
  
  setGroupe_sanguin(event) {
    this.identity.groupe_sanguin = event.target.value;
  }
  
  setAntecedant(event) {
    this.identity.antecedant = event.target.value;
  }
  
  setAllergie(event) {
    this.identity.allergie = event.target.value;
  }
  
  sendData(data) {
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  dismissData() {
    let data = this.identity;
    this.viewCtrl.dismiss(data);
  }
   
 }
