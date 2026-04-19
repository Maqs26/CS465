import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface PageItem {
  title: string;
  description: string;
  image: string;
}

interface PageContent {
  heading: string;
  intro: string;
  items: PageItem[];
}

const PAGE_CONTENT: Record<string, PageContent> = {
  rooms: {
    heading: 'Rooms',
    intro: 'Choose from our most popular room options for your next stay.',
    items: [
      { title: 'First Class Room', description: 'Spacious room with premium amenities.', image: 'assets/images/first-class.jpg' },
      { title: 'Deluxe Room', description: 'Comfort-focused room with ocean breeze.', image: 'assets/images/deluxe.jpg' },
      { title: 'Suite Room', description: 'Luxury suite with an unforgettable view.', image: 'assets/images/suite.jpg' },
    ],
  },
  meals: {
    heading: 'Meals',
    intro: 'Fresh food options prepared daily by our on-site chefs.',
    items: [
      { title: 'Seafood Special', description: 'Local catches and tropical flavors.', image: 'assets/images/seafoods.jpg' },
      { title: 'Desserts', description: 'Sweet treats and signature favorites.', image: 'assets/images/desserts.jpg' },
      { title: 'Buffet', description: 'A rotating buffet with something for everyone.', image: 'assets/images/buffet.jpg' },
    ],
  },
  news: {
    heading: 'News',
    intro: 'Latest updates and stories from Travlr Getaways.',
    items: [
      { title: 'Experience Kayaking', description: 'Top water activities for this season.', image: 'assets/images/kayak.jpg' },
      { title: 'Sound of the Sea', description: 'New wellness packages now available.', image: 'assets/images/sea-sound.jpg' },
    ],
  },
  about: {
    heading: 'About',
    intro: 'Learn more about the Travlr team and mission.',
    items: [
      { title: 'Our Crew', description: 'Hospitality experts focused on memorable travel.', image: 'assets/images/rooms.png' },
      { title: 'Amenities', description: 'Comfort, adventure, and convenience in one place.', image: 'assets/images/dive-site.png' },
    ],
  },
  contact: {
    heading: 'Contact',
    intro: 'Need help? Reach out to our team any time.',
    items: [
      { title: 'Email Us', description: 'support@travlrgetaways.example', image: 'assets/images/logo.png' },
      { title: 'Call Us', description: '1-800-999-9999', image: 'assets/images/bg-adbox.png' },
    ],
  },
};

@Component({
  selector: 'app-static-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './static-page.html',
  styleUrl: './static-page.css',
})
export class StaticPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly content = computed(() => {
    const section = this.route.snapshot.data['section'] as string;
    return PAGE_CONTENT[section] ?? PAGE_CONTENT['about'];
  });
}
