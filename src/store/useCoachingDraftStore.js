import { create } from "zustand";

export const useCoachingDraftStore = create((set) => ({
  resumeText: "",
  resumeImage: null,
  jobText: "",
  jobImage: null,
  targetCountry: "",
  targetCompany: "",
  result: null,

  setResumeDraft: ({ resumeText, resumeImage }) =>
    set({ resumeText, resumeImage }),

  setApplicationDraft: ({ jobText, jobImage, targetCountry, targetCompany }) =>
    set({ jobText, jobImage, targetCountry, targetCompany }),

  setResult: (result) => set({ result }),

  reset: () =>
    set({
      resumeText: "",
      resumeImage: null,
      jobText: "",
      jobImage: null,
      targetCountry: "",
      targetCompany: "",
      result: null,
    }),
}));
