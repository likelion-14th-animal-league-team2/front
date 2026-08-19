import { create } from "zustand";

export const useCoachingDraftStore = create((set) => ({
  resumeText: "",
  resumeImage: null,
  jobText: "",
  jobImage: null,
  jobTitle: "",
  targetCountry: "",
  targetCompany: "",
  result: null,

  setResumeDraft: ({ resumeText, resumeImage }) =>
    set({ resumeText, resumeImage }),

  setApplicationDraft: ({ jobText, jobImage, jobTitle, targetCountry, targetCompany }) =>
    set({ jobText, jobImage, jobTitle, targetCountry, targetCompany }),

  setResult: (result) => set({ result }),

  reset: () =>
    set({
      resumeText: "",
      resumeImage: null,
      jobText: "",
      jobImage: null,
      jobTitle: "",
      targetCountry: "",
      targetCompany: "",
      result: null,
    }),
}));
