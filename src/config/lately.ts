export type LatelyConfig = {
  building: {
    title: string;
    description: string;
  };
  thinkingAbout: string[];
  reading: {
    title: string;
    author: string;
    coverImage?: string;
  };
  currentObsession: {
    description: string;
    photo?: string;
  };
};

export const lately: LatelyConfig = {
  building: {
    title: "A biomedical sensing device",
    description:
      "Early-stage hardware project exploring low-cost, continuous health monitoring at home. Still in the research-and-prototype phase — equal parts exciting and humbling.",
  },
  thinkingAbout: [
    "Why most people who want to change their health don't — and what would actually work.",
    "Whether building in public accelerates the work or distracts from it.",
    "What it looks like to do serious original research without an institution backing you.",
  ],
  reading: {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    // coverImage: "/images/books/hard-thing.jpg",
  },
  currentObsession: {
    description:
      "Long runs early in the morning before anyone else is up. I'm training for nothing in particular — I just like the way it makes the rest of the day feel earned.",
    // photo: "/images/lately/running.jpg",
  },
};
