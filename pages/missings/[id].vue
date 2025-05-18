<template>
  <main class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
    <section v-if="missing">
      <LayoutHeader
        :title="'Disparu(e) - ' + missing.prenom + ' ' + missing.nom"
      />
      
      <div class="bg-white shadow-md rounded-lg p-6 mt-8">
        <!-- En-tête avec photo et informations principales -->
        <div class="flex flex-col md:flex-row gap-6 mb-8">
          <div class="w-full md:w-1/3 flex flex-col items-center">
            <!-- Placeholder pour photo -->
            <div class="bg-gray-200 rounded-full w-48 h-48 flex items-center justify-center mb-4">
              <UserIcon class="h-24 w-24 text-gray-400" />
            </div>
            
            <!-- Statut -->
            <div :class="`px-4 py-2 rounded-full text-sm font-medium ${missing.statut.includes('Décédé') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`">
              {{ missing.statut }}
            </div>
          </div>
          
          <div class="w-full md:w-2/3">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ missing.prenom }} {{ missing.nom }}</h2>
            
            <!-- Informations personnelles -->
            <div class="space-y-3">
              <div class="flex items-center">
                <CalendarIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700 font-medium">Date de naissance:</span>
                <span class="ml-2">{{ formatDate(missing.dateNaissance) }}</span>
              </div>
              
              <div class="flex items-start">
                <BriefcaseIcon class="h-5 w-5 text-gray-500 mr-2 mt-1" />
                <span class="text-gray-700 font-medium">Affectation:</span>
                <span class="ml-2 whitespace-pre-line">{{ missing.affectation }}</span>
              </div>
              
              <div class="flex items-center">
                <AcademicCapIcon class="h-5 w-5 text-gray-500 mr-2" />
                <span class="text-gray-700 font-medium">Rang:</span>
                <span class="ml-2">{{ missing.rang }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Détails de la disparition -->
        <div class="border-t border-gray-200 pt-6 mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <ExclamationTriangleIcon class="h-5 w-5 text-amber-500 mr-2" />
            Informations sur la disparition
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <CalendarIcon class="h-5 w-5 text-gray-500 mr-2" />
              <span class="text-gray-700 font-medium">Date de disparition:</span>
              <span class="ml-2">{{ formatDate(missing.dateDisparition) }}</span>
            </div>
            
            <div class="flex items-start">
              <MapPinIcon class="h-5 w-5 text-gray-500 mr-2 mt-1" />
              <span class="text-gray-700 font-medium">Dernier contact:</span>
              <span class="ml-2 whitespace-pre-line">{{ missing.dernierContact }}</span>
            </div>
          </div>
        </div>
        
        <!-- Résumé -->
        <div class="border-t border-gray-200 pt-6 mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon class="h-5 w-5 text-blue-500 mr-2" />
            Résumé
          </h3>
          
          <div class="bg-gray-50 p-4 rounded-md">
            <p class="text-gray-700 whitespace-pre-line">{{ missing.resume }}</p>
          </div>
        </div>
        
        <!-- Annexes -->
        <div class="border-t border-gray-200 pt-6 mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <PaperClipIcon class="h-5 w-5 text-gray-500 mr-2" />
            Annexes
          </h3>
          
          <div class="bg-gray-50 p-4 rounded-md">
            <p class="text-gray-700 whitespace-pre-line">{{ missing.annexes }}</p>
          </div>
        </div>
      </div>
      
      <!-- Bouton de retour -->
      <div class="mt-8">
        <NuxtLink to="/missings" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          Retour à la liste
        </NuxtLink>
      </div>
    </section>
    
    <section v-else class="text-center py-12">
      <ExclamationCircleIcon class="h-16 w-16 text-red-500 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-gray-900">Personne disparue non trouvée</h2>
      <p class="mt-2 text-gray-600">L'identifiant spécifié n'existe pas dans notre base de données.</p>
      <NuxtLink to="/missings" class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <ArrowLeftIcon class="h-5 w-5 mr-2" />
        Retour à la liste
      </NuxtLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import missings from "~/assets/jsons/missing.json";
import { 
  UserIcon, 
  CalendarIcon, 
  BriefcaseIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  DocumentTextIcon,
  PaperClipIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline';

const { id } = useRoute().params;
const missing = missings.find((m) => m.id === id);

useHead({
  title: `Les disparus - ${missing?.prenom} ${missing?.nom}`,
  description: `Les disparus de la guilde en lien avec l'affaire de la Dame en Rouge`,
});

// Format the date in a readable format
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
</script>
