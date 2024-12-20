// class StatusBar extends DrawableObject {
//     percentage = 0; // Standardwert für die Prozentanzeige

//     constructor(images) {
//         super();
//         this.IMAGES = images; // Bilder werden aus der erbenden Klasse übergeben
//         this.loadImages(this.IMAGES);
//     }

//     setPercentage(percentage) {
//         this.percentage = percentage;
//         let path = this.IMAGES[this.resolveImageIndex()]; // Index wird von der Basisklasse ermittelt
//         this.img = this.imageCache[path];
//     }

//     resolveImageIndex() {
//         if (this.percentage == 100) {
//             return 5;
//         } else
//             if (this.percentage > 80) {
//                 return 4;
//             } else
//                 if (this.percentage > 60) {
//                     return 3;
//                 } else
//                     if (this.percentage > 40) {
//                         return 2;
//                     } else
//                         if (this.percentage > 20) {
//                             return 1;
//                         } else {
//                             return 0;
//                         }
//     }
// }