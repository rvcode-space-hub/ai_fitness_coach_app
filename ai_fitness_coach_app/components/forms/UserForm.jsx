"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { User, Target, Dumbbell, MapPin, Utensils } from "lucide-react";
import Spinner from "../ui/spinner";

/* ------------------- ZOD SCHEMA (with number coercion) ----------------------- */
const numberCoerce = (val) =>
  typeof val === "string" && val.trim() !== "" ? Number(val) : val;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.preprocess(numberCoerce, z.number().int().min(5, "Enter valid age").max(120, "Enter valid age")),
  gender: z.string().min(1, "Gender is required"),
  height: z.preprocess(numberCoerce, z.number().positive("Enter valid height (cm)")),
  weight: z.preprocess(numberCoerce, z.number().positive("Enter valid weight (kg)")),
  goal: z.string().min(1, "Please choose a goal"),
  level: z.string().min(1, "Please select your level"),
  location: z.string().min(1, "Select workout location"),
  diet: z.string().min(1, "Select dietary preference"),
});

export default function ModernFitnessForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: "",
      height: undefined,
      weight: undefined,
      goal: "",
      level: "",
      location: "",
      diet: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Submitting:", data);

      // Simulated API request: replace with your real API call
      await new Promise((res) => setTimeout(res, 1400));

      // success
      alert("Form submitted successfully! Check console for data.");
   
      reset();

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto relative">
        {/* form container that will be blurred when loading */}
        <div className={`transition-[filter,opacity] duration-200 ${loading ? "blur-sm pointer-events-none opacity-70" : "blur-0 opacity-100"}`}>
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">Fitness Profile</h1>
            <p className="text-sm sm:text-base text-slate-600">Create your personalized fitness journey</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* ---------------- PERSONAL INFO ---------------- */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
                </div>
                <CardDescription className="text-sm">Tell us about yourself</CardDescription>
              </CardHeader>

              <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Name</Label>
                    <Input placeholder="Enter your name" {...register("name")} className="h-10 sm:h-11" />
                    {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name.message}</p>}
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Age</Label>
                    <Input type="number" placeholder="Enter age" {...register("age")} className="h-10 sm:h-11" />
                    {errors.age && <p className="text-red-500 text-xs sm:text-sm">{errors.age.message}</p>}
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Gender</Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          setValue("gender", val, { shouldValidate: true });
                        }}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && <p className="text-red-500 text-xs sm:text-sm">{errors.gender.message}</p>}
                </div>

                {/* Height + Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Height (cm)</Label>
                    <Input type="number" placeholder="Enter height" {...register("height")} className="h-10 sm:h-11" />
                    {errors.height && <p className="text-red-500 text-xs sm:text-sm">{errors.height.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Weight (kg)</Label>
                    <Input type="number" placeholder="Enter weight" {...register("weight")} className="h-10 sm:h-11" />
                    {errors.weight && <p className="text-red-500 text-xs sm:text-sm">{errors.weight.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ---------------- FITNESS GOALS ---------------- */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <CardTitle className="text-lg sm:text-xl">Fitness Goals</CardTitle>
                </div>
                <CardDescription className="text-sm">Define your objectives</CardDescription>
              </CardHeader>

              <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Fitness Goal</Label>
                  <Controller
                    control={control}
                    name="goal"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          setValue("goal", val, { shouldValidate: true });
                        }}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose">Lose Weight</SelectItem>
                          <SelectItem value="build">Build Muscle</SelectItem>
                          <SelectItem value="endurance">Improve Endurance</SelectItem>
                          <SelectItem value="general">General Fitness</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.goal && <p className="text-red-500 text-xs sm:text-sm">{errors.goal.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Fitness Level</Label>
                  <Controller
                    control={control}
                    name="level"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          setValue("level", val, { shouldValidate: true });
                        }}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.level && <p className="text-red-500 text-xs sm:text-sm">{errors.level.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* ---------------- PREFERENCES ---------------- */}
            <Card className="border-slate-200 shadow-lg">
              <CardHeader className="bg-linear-to-r from-purple-50 to-pink-50 p-4 sm:p-6">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <CardTitle className="text-lg sm:text-xl">Preferences</CardTitle>
                </div>
                <CardDescription className="text-sm">Your workout and diet preferences</CardDescription>
              </CardHeader>

              <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm sm:text-base">
                    <MapPin className="w-4 h-4" /> Workout Location
                  </Label>
                  <Controller
                    control={control}
                    name="location"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          setValue("location", val, { shouldValidate: true });
                        }}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="gym">Gym</SelectItem>
                          <SelectItem value="outdoor">Outdoor</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.location && <p className="text-red-500 text-xs sm:text-sm">{errors.location.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm sm:text-base">
                    <Utensils className="w-4 h-4" /> Dietary Preference
                  </Label>
                  <Controller
                    control={control}
                    name="diet"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(val) => {
                          field.onChange(val);
                          setValue("diet", val, { shouldValidate: true });
                        }}
                      >
                        <SelectTrigger className="h-10 sm:h-11">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veg">Vegetarian</SelectItem>
                          <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="keto">Keto</SelectItem>
                          <SelectItem value="lowcarb">Low-Carb</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.diet && <p className="text-red-500 text-xs sm:text-sm">{errors.diet.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* SUBMIT */}
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="relative w-full h-11 sm:h-12 text-base sm:text-lg font-semibold
               bg-linear-to-r from-blue-600 to-indigo-600
               hover:from-blue-700 hover:to-indigo-700"
              >
                {/* Centered Spinner inside button (kept for visual continuity) */}
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner />
                  </div>
                )}

                {/* This text will be hidden while loading */}
                <span className={loading ? "opacity-0" : "opacity-100"}>Start Your Journey</span>
              </Button>
            </div>
          </form>
        </div>


        {loading && (
          <div
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center">
              <Spinner className="w-14 h-14" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
