// Campfire Mode Data

export interface Game {
  id: string;
  name: string;
  players: string;
  overview: string;
  instructions: string[];
}

export interface Story {
  id: string;
  title: string;
  category: 'family' | 'scary' | 'local';
  preview: string;
  content: string;
}

export const CAMPFIRE_GAMES: Game[] = [
  {
    id: '1',
    name: 'Two Truths and a Lie',
    players: '3+ players',
    overview: 'Each person shares three statements about themselves—two true, one false. Others guess the lie!',
    instructions: [
      'One player thinks of two true facts and one lie about themselves.',
      'They share all three statements in any order.',
      'Other players discuss and vote on which statement is the lie.',
      'The speaker reveals the lie. Players who guessed correctly get a point.',
      'Rotate to the next player and repeat.',
      'Play until everyone has had a turn, or set a point goal to win.'
    ]
  },
  {
    id: '2',
    name: 'One-Sentence Story Chain',
    players: '2+ players',
    overview: 'Build a wild story together, one sentence at a time. The crazier, the better!',
    instructions: [
      'The first player starts with an opening sentence (e.g., "Once upon a time, a bear walked into a coffee shop...").',
      'The next player adds exactly one sentence to continue the story.',
      'Continue around the circle, each person adding one sentence.',
      'Try to keep the story coherent—or make it as silly as possible!',
      'End the story when someone says "The End" or after a set number of rounds.',
      'Bonus: Try themed stories like "spooky" or "adventure."'
    ]
  },
  {
    id: '3',
    name: '20 Questions',
    players: '2+ players',
    overview: 'One person thinks of something, others have 20 yes/no questions to guess it.',
    instructions: [
      'One player (the "answerer") thinks of a person, place, or thing.',
      'Other players take turns asking yes/no questions.',
      'The answerer can only respond with "Yes," "No," or "I don\'t know."',
      'Players can make a guess at any time instead of asking a question.',
      'If someone guesses correctly within 20 questions, they win and become the next answerer.',
      'If no one guesses in 20 questions, the answerer wins and picks again.'
    ]
  },
  {
    id: '4',
    name: 'Would You Rather',
    players: '2+ players',
    overview: 'Choose between two tricky options and defend your choice!',
    instructions: [
      'One player poses a "Would you rather" question with two options.',
      'Examples: "Would you rather have super strength or be able to fly?"',
      'Everyone else must choose one option—no skipping!',
      'Players share their choices and explain their reasoning.',
      'Debate and discuss—there are no wrong answers!',
      'Rotate who asks the next question.'
    ]
  },
  {
    id: '5',
    name: 'Categories',
    players: '3+ players',
    overview: 'Pick a category and go around naming things that fit. Hesitate and you\'re out!',
    instructions: [
      'One player picks a category (e.g., "Types of candy," "States," "Movie titles").',
      'Going clockwise, each player must name something in that category.',
      'No repeats allowed! Each answer must be unique.',
      'If a player hesitates too long (3-5 seconds) or repeats, they\'re out.',
      'Last player standing wins and picks the next category.',
      'Make it harder: require answers to start with a specific letter.'
    ]
  },
  {
    id: '6',
    name: 'Campfire I Spy',
    players: '2+ players',
    overview: 'The classic game, but with a campfire twist using nature and surroundings.',
    instructions: [
      'One player looks around and secretly picks an object they can see.',
      'They say "I spy with my little eye, something that is [color/description]."',
      'Other players take turns guessing what the object might be.',
      'The spy answers "yes" or "no" to each guess.',
      'Whoever guesses correctly becomes the next spy.',
      'Tip: Use nature items like "something green" (trees) or "something glowing" (fire).'
    ]
  },
  {
    id: '7',
    name: 'Name That Tune',
    players: '3+ players',
    overview: 'Hum or whistle a song and see who can guess it first!',
    instructions: [
      'One player thinks of a well-known song.',
      'They hum, whistle, or tap out the melody—no words allowed!',
      'Other players try to guess the song title and/or artist.',
      'First correct guess wins a point and becomes the next performer.',
      'If no one guesses after 30 seconds, the performer can give a hint.',
      'Play to a set number of points or just for fun!'
    ]
  }
];

export const CAMPFIRE_STORIES: Story[] = [
  // Family-Friendly Stories
  {
    id: 'f1',
    title: 'The Friendly Forest Giant',
    category: 'family',
    preview: 'A gentle giant who protects the forest and its creatures...',
    content: `Deep in the Ouachita Mountains, where the pine trees grow tall and the streams run crystal clear, there lived a giant named Oakley. Unlike the scary giants in storybooks, Oakley was as gentle as a summer breeze.

Oakley stood twenty feet tall, with bark-like skin and leaves growing from his hair. He spent his days caring for the forest—helping lost hikers find their way, nursing injured animals back to health, and making sure the streams stayed clean and full of fish.

One autumn evening, a family camping nearby heard strange sounds in the woods. The children were frightened, but their father told them not to worry. "That's just Oakley," he said with a smile, "singing the forest to sleep."

The children peeked out of their tent and saw the giant gently tucking leaves around sleeping deer and humming a lullaby that made the whole forest glow with fireflies.

From that night on, whenever the family visited the cabin, they would leave out a basket of acorns and pinecones—a thank you gift for the Friendly Forest Giant who watched over all who entered his woods.

To this day, if you're very quiet on a calm night in the Ouachitas, you might just hear Oakley's lullaby on the wind.`
  },
  {
    id: 'f2',
    title: 'The Campfire That Talked',
    category: 'family',
    preview: 'What happens when a campfire starts sharing stories of its own...',
    content: `The Martinez family had been coming to the same campsite in Broken Bow for three generations. Grandpa Joe knew exactly which rocks to arrange for the perfect fire pit, and he always brought the same old iron poker that had belonged to his father.

One night, as the fire crackled and popped, young Sofia noticed something strange. The sparks seemed to form shapes—first a rabbit, then a fish, then what looked like a tiny dancing person.

"Grandpa, look!" she whispered.

Grandpa Joe smiled and leaned in close. "Ah, you can see them too. This fire has stories to tell, if you know how to listen."

As if responding to his words, the flames rose higher and began to swirl. In the dancing light, Sofia saw scenes playing out—a young Grandpa Joe roasting marshmallows with his own grandfather, her mother as a little girl catching fireflies, and even herself as a baby, sleeping peacefully by a warm fire.

"The campfire remembers everyone who's ever gathered around it," Grandpa Joe explained. "It keeps our family's stories safe and warm, just like it keeps us."

Sofia reached out toward the fire (but not too close!) and whispered, "Thank you for keeping our stories."

The fire crackled happily in response, and for just a moment, it seemed to wink.`
  },
  {
    id: 'f3',
    title: 'The Secret of Starlight Lake',
    category: 'family',
    preview: 'A magical lake that grants wishes to those with kind hearts...',
    content: `Everyone in Hochatown knew about Broken Bow Lake, but only a few knew about the hidden cove called Starlight Lake—a tiny inlet where the water was so still it perfectly reflected the night sky.

Ten-year-old Marcus discovered it by accident while exploring with his dog, Biscuit. As they rounded a bend in the trail, the trees opened up to reveal the most beautiful sight Marcus had ever seen: a small lake that looked like it held a thousand stars.

"Wow, Biscuit," Marcus breathed. "It's like someone caught the whole sky!"

As if hearing him, the water began to glow softly. A friendly voice seemed to come from everywhere and nowhere: "I am Starlight Lake. I've been waiting for someone with eyes that see magic and a heart that believes."

Marcus wasn't scared—the voice felt warm and kind, like a hug from his grandmother.

"I can grant one wish," the lake continued, "but only to those who wish for others, not themselves."

Marcus didn't even have to think. "I wish for my little sister Emma to stop having nightmares. She's been so scared at night."

The lake glowed brighter, and a single ball of starlight rose from the water. "Take this home and place it by her bed. She will only dream of wonderful things."

That night, Marcus tucked the softly glowing orb next to Emma's pillow. She slept peacefully for the first time in months, dreaming of friendly forest giants and talking campfires.

And somewhere in the woods, Starlight Lake sparkled a little brighter, happy to have found a truly kind heart.`
  },
  
  // Scary Stories
  {
    id: 's1',
    title: 'The Cabin at Mile Marker 13',
    category: 'scary',
    preview: 'Some places are abandoned for a reason...',
    content: `Nobody drives past mile marker 13 on the old forest road after dark. The locals know better, and the smart tourists listen to warnings. But Jake thought he knew better than everyone.

"It's just an old cabin," he laughed when his friends refused to come. "I'll take pictures and prove there's nothing there."

He found the cabin right where the stories said it would be—a decrepit structure with windows like hollow eyes and a door that hung open like a mouth frozen mid-scream.

Jake stepped inside, his flashlight cutting through decades of dust. The walls were covered in strange marks—not words, but tallies. Hundreds and hundreds of tallies.

"People counting days?" he muttered. But then he noticed something that made his blood run cold.

The tallies weren't scratched into the walls. They were scratched OUT from the walls. From the inside.

His flashlight flickered. When it steadied, he saw that one wall was different. Instead of tallies, there was writing:

"You're already inside. You can't leave until someone else comes in."

Jake ran for the door. It was closed. He hadn't closed it.

He pulled and pulled, but it wouldn't budge. That's when he heard footsteps on the porch.

"Hello?" a voice called. "Anyone in there? I saw your car..."

Jake tried to scream a warning, but no sound came out. He could only watch as the door slowly creaked open and a curious face peered inside.

The door slammed shut behind the newcomer. Jake's voice returned just in time to whisper:

"I'm so sorry. But now you're inside too."

They say if you drive past mile marker 13 at night, you might see lights flickering in that old cabin. Some say it's Jake, still trapped. Others say it's just a story.

But nobody drives past after dark. Just in case.`
  },
  {
    id: 's2',
    title: 'The Thing in the Lake',
    category: 'scary',
    preview: 'The locals call it "Old Scratch" and they never swim after sunset...',
    content: `The fishing guide named Dale had worked Broken Bow Lake for forty years. He'd seen everything—or so he thought until the summer a group of college kids rented his boat for a night fishing expedition.

"Stay in the boat," Dale warned them. "Don't put your hands in the water after dark. And whatever you do, don't shine your lights into the deep water near the old dam."

They laughed at him, of course. Kids always do.

Around midnight, one of them—a girl named Casey—was trailing her fingers in the water when she suddenly went pale.

"Something... something touched me," she whispered. "Something with fingers. Long, cold fingers."

"Pull your hand out. Now." Dale's voice was deadly serious.

She tried. She couldn't. Something was holding her wrist under the water.

Dale grabbed her arm and pulled. For a moment, there was resistance—something pulling back from below. Then Casey came free with a gasp, and Dale saw the marks on her wrist: four long scratches, perfectly parallel.

"What was that?" the kids screamed.

Dale started the motor and headed for shore as fast as the boat could go. But not before one kid made a terrible mistake. He shined his flashlight into the water.

For just a second, they all saw it: a pale face looking up from the depths, with hollow eyes and a mouth full of needle-thin teeth. And it was smiling.

Nobody said a word until they reached the dock. As the kids scrambled onto land, Dale called after them:

"The locals call it Old Scratch. It's been in that lake longer than anyone can remember. It can't leave the water, but it can wait. And it has all the time in the world."

He paused. "It tasted her tonight. Now it knows her scent. She should never come back to this lake. Ever."

Casey moved away from Oklahoma that very month.

But sometimes, on quiet nights, she swears she can still feel those cold fingers wrapped around her wrist.`
  },
  {
    id: 's3',
    title: 'The Last Broadcast',
    category: 'scary',
    preview: 'Late-night radio can tune into more than just music...',
    content: `When Marcus stayed alone at his family's cabin, he liked to listen to the old radio his grandfather had left behind. It only picked up AM stations—mostly static and distant talk shows—but there was something comforting about the crackling voices in the dark.

One night, around 3 AM, Marcus woke to the sound of the radio turning on by itself.

Static. Then a voice.

"This is KOAK, broadcasting from the Ouachita Mountains. If you can hear this, do not respond. Do not speak. Whatever you do, do not say your name."

Marcus sat up, heart pounding. This wasn't one of the usual stations.

"It is currently 3:07 AM. The temperature outside is 43 degrees. The temperature inside your cabin is 62 degrees. The temperature in the corner of your room is 31 degrees."

Marcus slowly turned to look at the corner of his room. The darkness there seemed thicker somehow. Deeper.

"There are two of you listening now," the voice continued. "One will survive until morning. The other will not. The one who speaks first will be the one we take."

Marcus clamped his hand over his mouth. The darkness in the corner shifted.

Silence stretched on for what felt like hours. Then, just as dawn began to lighten the windows, the voice spoke one final time:

"Sunrise approaches. We must go. But we'll be back tomorrow night, Marcus. And every night after. Eventually, you'll forget. Eventually, you'll speak."

The radio clicked off.

Marcus ran from the cabin that morning and never returned. He sold the property and moved to a big city full of noise and light and people.

But some nights, when everything is quiet, he could swear he hears a radio playing softly in the distance.

And a voice, waiting patiently for him to answer.`
  },
  
  // Local Folklore Stories
  {
    id: 'l1',
    title: 'The Honobia Bigfoot',
    category: 'local',
    preview: 'The most famous creature of the Kiamichi Wilderness...',
    content: `The small town of Honobia, Oklahoma, just east of the Kiamichi Mountains, has a secret that its residents don't mind sharing: they live alongside Bigfoot.

It started in the 1960s when loggers working deep in the forest began reporting strange encounters. They'd find massive footprints in the mud—eighteen inches long, with five distinct toes. They'd hear whooping calls that weren't quite human and weren't quite animal. And sometimes, in the dim light of dawn, they'd see a figure watching them from the tree line. Tall. Covered in dark hair. With eyes that reflected their flashlights like a deer's, but higher. Much higher.

Old Tom Bridges, who's lived in Honobia all his ninety years, claims he had a face-to-face encounter back in 1978.

"I was checking my trotlines down by the creek," he recalls, "when I smelled something awful—like a skunk mixed with wet dog. I looked up, and there he was. Had to be eight feet tall, standing in the water not thirty feet away. We just stared at each other for a good minute. Then he made this sound—like a grunt and a whistle mixed together—and walked off into the trees. Didn't run. Just walked. Like he owned the place."

Tom pauses. "Which I reckon he does. He was here long before us."

Today, Honobia hosts an annual Bigfoot Festival and has a Bigfoot statue in the center of town. Researchers from around the world come to investigate the Kiamichi Wilderness, which has more Bigfoot sightings per square mile than almost anywhere in North America.

Are the stories true? The people of Honobia just smile when you ask.

"Come spend a night in the deep woods," they say. "Then decide for yourself."

Just remember: if you smell something awful and hear a whistle in the trees, whatever you do, don't run. He doesn't like it when people run.`
  },
  {
    id: 'l2',
    title: 'The Kiamichi Wampus Cat',
    category: 'local',
    preview: 'A Cherokee legend walks the hills of southeastern Oklahoma...',
    content: `Long before settlers came to the Kiamichi Mountains, the Cherokee people told stories of the Wampus Cat—a creature born from magic, betrayal, and a woman's unbreakable will.

The legend says that a young Cherokee woman named Running Deer suspected her husband of sneaking away at night to meet with other women. Determined to catch him, she crafted a disguise from the skin of a mountain lion and followed him into the forest.

But her husband wasn't meeting other women. He was meeting with the medicine men, learning sacred rituals that were forbidden to women. When Running Deer was discovered, the medicine men cursed her—binding her forever into the mountain lion skin, transforming her into something neither human nor animal.

Now the Wampus Cat roams the Kiamichi hills, and the locals know her signs. They hear her screaming in the night—a sound like a woman in agony mixed with a cougar's cry. They find deer carcasses with strange claw marks, and cattle spooked so badly they break through fences to escape something their owners cannot see.

Martha Kingfisher, a Cherokee elder living near Broken Bow, says the Wampus Cat isn't evil—just tormented.

"She's stuck between two worlds," Martha explains. "Human enough to feel sorrow, animal enough to hunt. She's not looking to hurt people. She's looking for a way to break the curse. Some say if a medicine man speaks the right words, she'll finally find peace."

Until then, the Wampus Cat walks.

If you're camping in the Kiamichi Wilderness and hear what sounds like a woman crying in the distance, don't investigate. Light your fire higher, stay together, and wait for dawn.

Running Deer is still out there. And she's been looking for peace for a very, very long time.`
  },
  {
    id: 'l3',
    title: 'The Lost Spanish Gold of the Ouachitas',
    category: 'local',
    preview: 'Conquistadors hid a fortune in these mountains, and some say it\'s still guarded...',
    content: `In 1541, the Spanish explorer Hernando de Soto led an expedition through what is now southeastern Oklahoma. His men were searching for gold, and according to local legend, they found it—a fortune in gold and silver taken from native peoples across the region.

But the Ouachita Mountains had other plans.

Attacked by native warriors and ravaged by disease, de Soto's expedition fell apart. Before retreating, the surviving soldiers allegedly hid their treasure in a cave somewhere in the mountains, sealing the entrance and leaving markers they believed they'd someday return to follow.

They never came back. But the treasure, they say, is still there.

For nearly 500 years, people have searched for the Lost Spanish Gold. In the 1920s, a farmer named Ezekiel Black claimed to have found one of the markers—a cross carved into stone, pointing deeper into the wilderness. He followed it and discovered a second marker, then a third. But when he returned with tools to dig, he couldn't find the trail again. He searched for the rest of his life and never located those markers again.

Others have had stranger experiences.

Hikers near the old mining trails report seeing lights floating through the trees at night—not flashlights or campfires, but pale blue orbs that drift silently through the forest. Some say they're the spirits of de Soto's men, still guarding their treasure. Others say they're will-o'-wisps leading the greedy to their doom.

Henry Whitehorse, who's guided treasure hunters in the Ouachitas for decades, has a warning for those who search:

"The mountains don't give up their secrets easy. I've seen folks go in looking for gold and come out... changed. Jumpy. Like they saw something they won't talk about. Maybe the treasure's real, maybe it isn't. But something in those mountains doesn't want it found."

The Lost Spanish Gold remains unclaimed. And on moonless nights, the blue lights still dance among the ancient trees, leading the curious ever deeper into the Ouachita darkness.`
  }
];
