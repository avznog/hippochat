import { Injectable } from '@angular/core';
import { Changelog } from 'src/app/models/chaneglogs.model';

@Injectable({
  providedIn: 'root'
})
export class ChangelogsService {

  webChangelogs: Changelog[] = [
    {
      version: "0.0.1(7)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution de bugs"
      ],
      features: [
        "Création des invitations pour mates",
        "Mise à jour des emojis et des pictures"
      ]
    },
    {
      version: "0.0.1(8)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug de HEIF pour les photos"
      ],
      features: []
    },
    {
      version: "0.0.1(9)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug de niveau de batterie"
      ],
      features: []
    },
    {
      version: "0.0.2(1)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug de date sur le Moodboard et sur l'album"
      ],
      features: []
    },
    {
      version: "0.0.3(1)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout de l'app icon et modification des assets"
      ]
    },
    {
      version: "0.0.3(2)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug du slide de retour en arrière sur le login",
      ],
      features: [
        "Ajout du splash screen"
      ]
    },
    {
      version: "1.0.0(1)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Première version upoadée pour vérification sur l'Apple Store",
        "Suppression du choix de la timezone à la création du compte"
      ]
    },
    {
      version: "1.0.0(2)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolutation de bugs pour la version Xcode d'upload chez Apple"
      ],
      features: [
        "Ajout de la fonctionnalité de suppresion d'un compte"
      ]
    },
    {
      version: "1.0.0(3)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout des EULA"
      ]
    },
    {
      version: "1.0.0(4)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout d'une alerte pour confirmer la suppression du compte",
        "Ajout d'un message explicatif lors du demande d'accès aux photos pour les appareils IOS"
      ]
    },
    // ! Publication sur l'Apple Store acceptée
    {
      version: "1.0.0(5)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Modification de la purpose string (message explicatif) pour la demande d'accès aux photos pour les appareils IOS",
      ]
    },
  ];


  iosChangelogs: Changelog[] = [
    {
      version: "0.0.1(7)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution de bugs"
      ],
      features: [
        "Création des invitations pour mates",
        "Mise à jour des emojis et des pictures"
      ]
    },
    {
      version: "0.0.1(8)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug de HEIF pour les photos"
      ],
      features: []
    },
    {
      version: "0.0.1(9)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug de niveau de batterie"
      ],
      features: []
    },
    {
      version: "0.0.2(1)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug de date sur le Moodboard et sur l'album"
      ],
      features: []
    },
    {
      version: "0.0.3(1)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout de l'app icon et modification des assets"
      ]
    },
    {
      version: "0.0.3(2)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolution du bug du slide de retour en arrière sur le login",
      ],
      features: [
        "Ajout du splash screen"
      ]
    },
    {
      version: "1.0.0(1)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Première version upoadée pour vérification sur l'Apple Store",
        "Suppression du choix de la timezone à la création du compte"
      ]
    },
    {
      version: "1.0.0(2)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolutation de bugs pour la version Xcode d'upload chez Apple"
      ],
      features: [
        "Ajout de la fonctionnalité de suppresion d'un compte"
      ]
    },
    {
      version: "1.0.0(3)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout des EULA"
      ]
    },
    {
      version: "1.0.0(4)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout d'une alerte pour confirmer la suppression du compte",
        "Ajout d'un message explicatif lors du demande d'accès aux photos pour les appareils IOS"
      ]
    },
    // ! Publication sur l'Apple Store acceptée
    {
      version: "1.0.0(5)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Modification de la purpose string (message explicatif) pour la demande d'accès aux photos pour les appareils IOS",
      ]
    },
  ];


  androidChangelogs: Changelog[] = [
    // ! correspond à la vIOS 1.0.0(1)
    {
      version: "0.0.3(3)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Première version upoadée pour vérification sur l'Apple Store",
        "Suppression du choix de la timezone à la création du compte"
      ]
    },
    // ! correspond à la vIOS 1.0.0(2)
    {
      version: "0.0.4(4)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
        "Résolutation de bugs pour la version Xcode d'upload chez Apple"
      ],
      features: [
        "Ajout de la fonctionnalité de suppresion d'un compte"
      ]
    },
    // ! correspond à la vIOS 1.0.0(3)
    {
      version: "0.0.5(5)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout des EULA"
      ]
    },
    // ! correspond à la vIOS 1.0.0(4)
    {
      version: "1.0.0(4)",
      date: "2023-12-09T03:32:53.712",
      bugs: [
      ],
      features: [
        "Ajout d'une alerte pour confirmer la suppression du compte",
        "Ajout d'un message explicatif lors du demande d'accès aux photos pour les appareils IOS"
      ]
    }
  ];
  constructor() { }
}
