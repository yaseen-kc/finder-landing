import { useState } from "react";
import {
  MOCK_PROFILE,
  PROFILE_LABELS,
  type Profile,
} from "@profileConstant";
import { profileSchema } from "../../schemas/profile/profileSchema";

export default function ProfileDetails() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableProfile, setEditableProfile] = useState<Profile>(() => ({
    name: MOCK_PROFILE.name ?? "",
    email: MOCK_PROFILE.email ?? "",
    mobile: MOCK_PROFILE.mobile ?? "",
    gender: MOCK_PROFILE.gender ?? undefined,
    dob: MOCK_PROFILE.dob ?? undefined,
  }));

  const handleFieldChange = (
    field: keyof Profile,
    value: string
  ) => {
    setEditableProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const parsed = profileSchema.safeParse(editableProfile);
    if (!parsed.success) {
      // Basic inline alert for now; could wire per-field messages similar to Address
      alert(parsed.error.issues[0]?.message ?? "Please fix validation errors");
      return;
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableProfile({
      name: MOCK_PROFILE.name ?? "",
      email: MOCK_PROFILE.email ?? "",
      mobile: MOCK_PROFILE.mobile ?? "",
      gender: MOCK_PROFILE.gender ?? undefined,
      dob: MOCK_PROFILE.dob ?? undefined,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">
          {PROFILE_LABELS.PROFILE_DETAILS_TITLE}
        </h1>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
          >
            {PROFILE_LABELS.EDIT}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              {PROFILE_LABELS.CANCEL}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-800"
            >
              {PROFILE_LABELS.SAVE}
            </button>
          </div>
        )}
      </div>

      <section className="rounded-xl border border-zinc-200 p-4">
        <div className="font-semibold text-zinc-900">
          {PROFILE_LABELS.PERSONAL_INFO}
        </div>
        <div className="mt-3 text-sm text-zinc-600">
          <div className="text-zinc-400">{PROFILE_LABELS.NAME_LABEL}</div>
          {!isEditing ? (
            <div className="text-zinc-800">{editableProfile.name || ""}</div>
          ) : (
            <input
              type="text"
              value={editableProfile.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none"
              placeholder="Enter your name"
            />
          )}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 p-4">
        <div className="font-semibold text-zinc-900">
          {PROFILE_LABELS.EMAIL_LABEL}
        </div>
        {!isEditing ? (
          <div className="mt-2 text-sm text-zinc-800">{editableProfile.email || ""}</div>
        ) : (
          <input
            type="email"
            value={editableProfile.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
            placeholder="Enter your email"
          />
        )}
      </section>

      <section className="rounded-xl border border-zinc-200 p-4">
        <div className="font-semibold text-zinc-900">
          {PROFILE_LABELS.MOBILE_LABEL}
        </div>
        {!isEditing ? (
          <div className="mt-2 text-sm text-zinc-800">{editableProfile.mobile || ""}</div>
        ) : (
          <input
            type="tel"
            value={editableProfile.mobile ?? ""}
            onChange={(e) => handleFieldChange("mobile", e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
            placeholder="Enter your mobile number"
          />
        )}
      </section>

      <section className="rounded-xl border border-zinc-200 p-4">
        <div className="font-semibold text-zinc-900">
          {PROFILE_LABELS.GENDER_LABEL}
        </div>
        {!isEditing ? (
          <div className="mt-2 text-sm text-zinc-800">{editableProfile.gender || ""}</div>
        ) : (
          <select
            value={editableProfile.gender ?? ""}
            onChange={(e) => handleFieldChange("gender", e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        )}
      </section>

      <section className="rounded-xl border border-zinc-200 p-4">
        <div className="font-semibold text-zinc-900">
          {PROFILE_LABELS.DOB_LABEL}
        </div>
        {!isEditing ? (
          <div className="mt-2 text-sm text-zinc-800">{editableProfile.dob || ""}</div>
        ) : (
          <input
            type="date"
            value={editableProfile.dob ?? ""}
            onChange={(e) => handleFieldChange("dob", e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
          />
        )}
      </section>
    </div>
  );
}


