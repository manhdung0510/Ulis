import type { ChoiceOption } from '@/components/ui/Choice';
import { distortionsVi } from '@/content/vi/distortions';
import { distortionsEn } from '@/content/en/distortions';
import { exercisesContentVi } from '@/content/vi/exercises';
import { exercisesContentEn } from '@/content/en/exercises';
import type {
  AppLanguage,
  EmotionStepValue,
  ExerciseAnswers,
  ExerciseId,
  ExerciseSummary,
} from '@/types/domain';

export type ExerciseStepType =
  | 'intro'
  | 'text'
  | 'choice-single'
  | 'choice-multi'
  | 'scale'
  | 'emotion'
  | 'review';

export interface ExerciseStepDefinition {
  id: string;
  type: ExerciseStepType;
  answerKey: string;
  title: string;
  instruction: string;
  example?: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  secondaryTextKey?: string;
  secondaryLabel?: string;
  secondaryPlaceholder?: string;
  scaleKey?: string;
  scaleLabel?: string;
  thoughtKey?: string;
  thoughtLabel?: string;
  thoughtPlaceholder?: string;
  emotionLabel?: string;
  options?: ChoiceOption[];
  requiredChoice?: boolean;
  minChoices?: number;
  maxChoices?: number;
  maxChoiceError?: string;
  showSelectedQuestions?: boolean;
  dynamicDistortionReflection?: boolean;
}

export interface ExerciseDefinition {
  id: ExerciseId;
  steps: ExerciseStepDefinition[];
}

export function getExerciseDefinition(
  exerciseId: ExerciseId,
  lang: AppLanguage
): ExerciseDefinition {
  const content = lang === 'en' ? exercisesContentEn : exercisesContentVi;
  const distortions = lang === 'en' ? distortionsEn.items : distortionsVi.items;

  switch (exerciseId) {
    case 'thought-record': {
      const tr = content.thoughtRecord.steps;
      return {
        id: 'thought-record',
        steps: [
          {
            id: 'situation',
            type: 'text',
            answerKey: 'situation',
            title: tr.situation.title,
            instruction: tr.situation.instruction,
            label: tr.situation.label,
            placeholder: tr.situation.placeholder,
            example: tr.situation.example,
            minLength: 10,
            maxLength: 500,
          },
          {
            id: 'thoughtEmotion',
            type: 'emotion',
            answerKey: 'emotionBefore',
            thoughtKey: 'initialThought',
            title: tr.thoughtEmotion.title,
            instruction: tr.thoughtEmotion.instruction,
            thoughtLabel: tr.thoughtEmotion.thoughtLabel,
            thoughtPlaceholder: tr.thoughtEmotion.thoughtPlaceholder,
            emotionLabel: tr.thoughtEmotion.emotionLabel,
            scaleLabel: tr.thoughtEmotion.intensityLabel,
            example: tr.thoughtEmotion.example,
            minLength: 10,
            maxLength: 400,
          },
          {
            id: 'distortions',
            type: 'choice-multi',
            answerKey: 'distortionIds',
            title: tr.distortions.title,
            instruction: tr.distortions.instruction,
            example: tr.distortions.example,
            requiredChoice: true,
            options: [
              ...distortions.map((d) => ({
                value: d.id,
                label: d.name,
                description: d.description,
                example: d.example,
              })),
              {
                value: 'unsure',
                label: tr.distortions.unsureLabel,
                description: tr.distortions.unsureDescription,
              },
            ],
          },
          {
            id: 'evidence',
            type: 'text',
            answerKey: 'evidenceAgainst',
            secondaryTextKey: 'evidenceFor',
            secondaryLabel: tr.evidence.forLabel,
            secondaryPlaceholder: tr.evidence.forPlaceholder,
            title: tr.evidence.title,
            instruction: tr.evidence.instruction,
            label: tr.evidence.againstLabel,
            placeholder: tr.evidence.againstPlaceholder,
            example: tr.evidence.example,
            minLength: 10,
            maxLength: 500,
          },
          {
            id: 'reframe',
            type: 'scale',
            answerKey: 'balancedThought',
            scaleKey: 'emotionAfter',
            title: tr.reframe.title,
            instruction: tr.reframe.instruction,
            thoughtKey: 'balancedThought',
            thoughtLabel: tr.reframe.balancedLabel,
            thoughtPlaceholder: tr.reframe.balancedPlaceholder,
            scaleLabel: tr.reframe.afterIntensityLabel,
            example: tr.reframe.example,
            minLength: 10,
            maxLength: 500,
          },
        ],
      };
    }

    case 'distortion-spotter': {
      const ds = content.distortionSpotter.steps;
      return {
        id: 'distortion-spotter',
        steps: [
          {
            id: 'thought',
            type: 'text',
            answerKey: 'initialThought',
            title: ds.thought.title,
            instruction: ds.thought.instruction,
            label: ds.thought.label,
            placeholder: ds.thought.placeholder,
            example: ds.thought.example,
            minLength: 10,
            maxLength: 400,
          },
          {
            id: 'pickDistortion',
            type: 'choice-single',
            answerKey: 'distortionId',
            title: ds.pickDistortion.title,
            instruction: ds.pickDistortion.instruction,
            example: ds.pickDistortion.example,
            requiredChoice: true,
            options: [
              ...distortions.map((d) => ({
                value: d.id,
                label: d.name,
                description: d.description,
                example: d.example,
              })),
              {
                value: 'unsure',
                label: ds.pickDistortion.unsureLabel,
                description: ds.pickDistortion.unsureDescription,
              },
            ],
          },
          {
            id: 'reflect',
            type: 'intro',
            answerKey: 'reflectionNote',
            title: ds.reflect.title,
            instruction: ds.reflect.instruction,
            label: ds.reflect.noteLabel,
            placeholder: ds.reflect.notePlaceholder,
            example: ds.reflect.example,
            maxLength: 400,
            dynamicDistortionReflection: true,
          },
        ],
      };
    }

    case 'thought-reframing': {
      const rf = content.thoughtReframing;
      return {
        id: 'thought-reframing',
        steps: [
          {
            id: 'thought',
            type: 'scale',
            answerKey: 'initialThought',
            thoughtKey: 'initialThought',
            scaleKey: 'emotionBeforeIntensity',
            title: rf.steps.thought.title,
            instruction: rf.steps.thought.instruction,
            thoughtLabel: rf.steps.thought.label,
            thoughtPlaceholder: rf.steps.thought.placeholder,
            scaleLabel: rf.steps.thought.intensityLabel,
            example: rf.steps.thought.example,
            minLength: 10,
            maxLength: 400,
          },
          {
            id: 'pickQuestions',
            type: 'choice-multi',
            answerKey: 'reframingQuestionIds',
            title: rf.steps.pickQuestions.title,
            instruction: `${rf.steps.pickQuestions.instruction} ${rf.steps.pickQuestions.limitHint}`,
            example: rf.steps.pickQuestions.example,
            requiredChoice: true,
            minChoices: 1,
            maxChoices: 3,
            maxChoiceError: rf.steps.pickQuestions.maxError,
            options: rf.questions.map((q) => ({
              value: q.id,
              label: q.label,
              description: q.helper,
            })),
          },
          {
            id: 'rewrite',
            type: 'text',
            answerKey: 'balancedThought',
            title: rf.steps.rewrite.title,
            instruction: rf.steps.rewrite.instruction,
            label: rf.steps.rewrite.label,
            placeholder: rf.steps.rewrite.placeholder,
            example: rf.steps.rewrite.example,
            minLength: 10,
            maxLength: 500,
            showSelectedQuestions: true,
          },
          {
            id: 'afterIntensity',
            type: 'scale',
            answerKey: 'emotionAfter',
            scaleKey: 'emotionAfter',
            title: rf.steps.afterIntensity.title,
            instruction: rf.steps.afterIntensity.instruction,
            scaleLabel: rf.steps.afterIntensity.label,
            example: rf.steps.afterIntensity.example,
          },
        ],
      };
    }

    case 'emotion-awareness': {
      const ea = content.emotionAwareness;
      return {
        id: 'emotion-awareness',
        steps: [
          {
            id: 'group',
            type: 'choice-single',
            answerKey: 'emotionGroup',
            title: ea.steps.group.title,
            instruction: ea.steps.group.instruction,
            example: ea.steps.group.example,
            requiredChoice: true,
            options: ea.groups.map((g) => ({
              value: g.id,
              label: g.label,
              description: g.description,
            })),
          },
          {
            id: 'words',
            type: 'choice-multi',
            answerKey: 'emotionWords',
            title: ea.steps.words.title,
            instruction: ea.steps.words.instruction,
            example: ea.steps.words.example,
            requiredChoice: true,
            options: [],
          },
          {
            id: 'body',
            type: 'choice-multi',
            answerKey: 'bodySensations',
            title: ea.steps.body.title,
            instruction: ea.steps.body.instruction,
            example: ea.steps.body.example,
            requiredChoice: true,
            options: ea.bodySensations.map((b) => ({
              value: b.id,
              label: b.label,
            })),
          },
          {
            id: 'context',
            type: 'text',
            answerKey: 'relatedContext',
            title: ea.steps.context.title,
            instruction: ea.steps.context.instruction,
            label: ea.steps.context.label,
            placeholder: ea.steps.context.placeholder,
            example: ea.steps.context.example,
            minLength: 10,
            maxLength: 400,
          },
        ],
      };
    }
  }
}

export function buildExerciseSummary(
  exerciseId: ExerciseId,
  answers: ExerciseAnswers,
  lang: AppLanguage
): ExerciseSummary {
  const content = lang === 'en' ? exercisesContentEn : exercisesContentVi;

  const initialThought =
    typeof answers.initialThought === 'string' ? answers.initialThought.trim() : undefined;
  const balancedThought =
    typeof answers.balancedThought === 'string' ? answers.balancedThought.trim() : undefined;

  let emotionBefore: EmotionStepValue | undefined;
  if (
    answers.emotionBefore &&
    typeof answers.emotionBefore === 'object' &&
    !Array.isArray(answers.emotionBefore)
  ) {
    emotionBefore = answers.emotionBefore;
  } else if (typeof answers.emotionBeforeIntensity === 'number') {
    emotionBefore = {
      emotion: 'stressed',
      intensity: answers.emotionBeforeIntensity as EmotionStepValue['intensity'],
    };
  }

  const emotionAfter =
    typeof answers.emotionAfter === 'number' ? answers.emotionAfter : undefined;

  const distortionIds = Array.isArray(answers.distortionIds)
    ? answers.distortionIds
    : typeof answers.distortionId === 'string'
      ? [answers.distortionId]
      : undefined;

  const emotionGroup =
    typeof answers.emotionGroup === 'string' ? answers.emotionGroup : undefined;
  const emotionWords = Array.isArray(answers.emotionWords) ? answers.emotionWords : undefined;
  const bodySensations = Array.isArray(answers.bodySensations)
    ? answers.bodySensations
    : undefined;

  let summarySentence: string | undefined;
  if (exerciseId === 'emotion-awareness' && emotionWords && emotionWords.length > 0) {
    const joinedWords = emotionWords.join(', ').toLowerCase();
    const context =
      typeof answers.relatedContext === 'string' ? answers.relatedContext.trim() : '';
    summarySentence = context
      ? `${content.emotionAwareness.summaryTemplatePrefix} ${joinedWords} (${context}).`
      : `${content.emotionAwareness.summaryTemplatePrefix} ${joinedWords}.`;
  }

  return {
    initialThought,
    balancedThought,
    emotionBefore,
    emotionAfter,
    distortionIds,
    emotionGroup,
    emotionWords,
    bodySensations,
    summarySentence,
  };
}
