import { useMemo, useState } from "react";
import {
  PROFILE_LABELS,
  MOCK_ADDRESSES,
  type SavedAddress,
} from "@profileConstant";
import { addressSchema } from "../../schemas/profile/addressSchema";

type AddressFormState = Omit<SavedAddress, "id">;

export default function Address() {
  const [addresses, setAddresses] = useState<SavedAddress[]>(MOCK_ADDRESSES);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<AddressFormState>(() => ({
    fullName: "",
    mobileNumber: "",
    pincode: "",
    locality: "",
    addressLine: "",
    cityDistrictTown: "",
    stateTerritoryRegion: "",
    landmark: "",
  }));

  const dialogTitle = useMemo(
    () =>
      editingId ? PROFILE_LABELS.EDIT_ADDRESS : PROFILE_LABELS.ADD_NEW_ADDRESS,
    [editingId]
  );

  const addressSchemaMemo = useMemo(() => addressSchema, []);

  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormState, string>>>({});

  const openAddForm = () => {
    setEditingId(null);
    setFormState({
      fullName: "",
      mobileNumber: "",
      pincode: "",
      locality: "",
      addressLine: "",
      cityDistrictTown: "",
      stateTerritoryRegion: "",
      landmark: "",
    });
    setIsFormOpen(true);
  };

  const openEditForm = (addr: SavedAddress) => {
    setEditingId(addr.id);
    setFormState({
      fullName: addr.fullName,
      mobileNumber: addr.mobileNumber,
      pincode: addr.pincode,
      locality: addr.locality,
      addressLine: addr.addressLine,
      cityDistrictTown: addr.cityDistrictTown,
      stateTerritoryRegion: addr.stateTerritoryRegion,
      landmark: addr.landmark ?? "",
    });
    setIsFormOpen(true);
  };

  const handleChange = (field: keyof AddressFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSave = () => {
    const parsed = addressSchemaMemo.safeParse(formState);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof AddressFormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof AddressFormState | undefined;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...formState } : a))
      );
    } else {
      const newAddress: SavedAddress = {
        id: `addr_${Date.now()}`,
        ...formState,
      };
      setAddresses((prev) => [newAddress, ...prev]);
    }
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">
          {PROFILE_LABELS.ADDRESS_TITLE}
        </h1>
        <button
          type="button"
          onClick={openAddForm}
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white hover:bg-zinc-800"
        >
          + {PROFILE_LABELS.ADD_NEW_ADDRESS}
        </button>
      </div>

      {/* Add/Edit form as an inline expandable section */}
      {isFormOpen && (
        <section className="rounded-xl border border-zinc-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-zinc-900">{dialogTitle}</div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.FULL_NAME}
              </div>
              <input
                type="text"
                value={formState.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="Enter full name"
              />
              {errors.fullName && (
                <div className="mt-1 text-xs text-error-600">{errors.fullName}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.MOBILE_NUMBER}
              </div>
              <input
                inputMode="tel"
                type="tel"
                value={formState.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="Enter mobile number"
              />
              {errors.mobileNumber && (
                <div className="mt-1 text-xs text-error-600">{errors.mobileNumber}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.PINCODE}
              </div>
              <input
                inputMode="numeric"
                type="text"
                value={formState.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="Enter pincode"
              />
              {errors.pincode && (
                <div className="mt-1 text-xs text-error-600">{errors.pincode}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.LOCALITY}
              </div>
              <input
                type="text"
                value={formState.locality}
                onChange={(e) => handleChange("locality", e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="Enter locality"
              />
              {errors.locality && (
                <div className="mt-1 text-xs text-error-600">{errors.locality}</div>
              )}
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.ADDRESS}
              </div>
              <textarea
                value={formState.addressLine}
                onChange={(e) => handleChange("addressLine", e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="House No, Building, Street, Area"
                rows={3}
              />
              {errors.addressLine && (
                <div className="mt-1 text-xs text-error-600">{errors.addressLine}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.CITY_DISTRICT_TOWN}
              </div>
              <input
                type="text"
                value={formState.cityDistrictTown}
                onChange={(e) =>
                  handleChange("cityDistrictTown", e.target.value)
                }
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="City/District/Town"
              />
              {errors.cityDistrictTown && (
                <div className="mt-1 text-xs text-error-600">{errors.cityDistrictTown}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.STATE_TERRITORY_REGION}
              </div>
              <input
                type="text"
                value={formState.stateTerritoryRegion}
                onChange={(e) =>
                  handleChange("stateTerritoryRegion", e.target.value)
                }
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="State/Territory/Region"
              />
              {errors.stateTerritoryRegion && (
                <div className="mt-1 text-xs text-error-600">{errors.stateTerritoryRegion}</div>
              )}
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-zinc-500 mb-1">
                {PROFILE_LABELS.LANDMARK_OPTIONAL}
              </div>
              <input
                type="text"
                value={formState.landmark}
                onChange={(e) => handleChange("landmark", e.target.value)}
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none"
                placeholder="Nearby landmark (optional)"
              />
              {errors.landmark && (
                <div className="mt-1 text-xs text-error-600">{errors.landmark}</div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Saved addresses list */}
      <div className="grid gap-4">
        {addresses.map((addr) => (
          <section
            key={addr.id}
            className="rounded-xl border border-zinc-200 overflow-hidden"
          >
            <div className="bg-zinc-100 px-4 py-2 text-sm flex items-center justify-between">
              <div className="font-medium text-zinc-800">
                {addr.fullName} • {addr.mobileNumber}
              </div>
              <button
                type="button"
                onClick={() => openEditForm(addr)}
                className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-50"
              >
                {PROFILE_LABELS.EDIT}
              </button>
            </div>
            <div className="p-4 text-sm text-zinc-700 space-y-1">
              <div>
                {addr.addressLine}, {addr.locality}
              </div>
              <div>
                {addr.cityDistrictTown}, {addr.stateTerritoryRegion} -{" "}
                {addr.pincode}
              </div>
              {addr.landmark ? (
                <div className="text-zinc-500">{addr.landmark}</div>
              ) : null}
            </div>
          </section>
        ))}
        {addresses.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-zinc-600">
            No addresses saved yet.
          </div>
        )}
      </div>
    </div>
  );
}
