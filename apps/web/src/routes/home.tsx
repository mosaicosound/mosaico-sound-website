import { Hero, Services, Portfolio, About, Contact, Newsletter } from '@/components/home/studio';

export function meta() {
	return [
		{ title: 'MOSAICO SOUND — Sound for stories, brands & worlds' },
		{ name: 'description', content: 'Independent dialogue editing, audio engineering and video game sound design. Thoughtful sound for advertising producers, film directors and creative teams.' },
		{ property: 'og:image', content: 'https://images.hostinger.com/2251e921-f900-4973-90a1-76aabdaad5dd/062972c5-6aa9-42bf-abb3-f35d0f86387f.png' },
	];
}

export default function HomePage() {
	return <main><Hero/><Portfolio/><Services/><About/><Contact/><Newsletter/></main>;
}
