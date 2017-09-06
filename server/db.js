const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const connection = require('knex')(config)

function getListings (conn) {
  const db = conn || connection
  return db('listings')
    .leftJoin(
      'organisations as provider',
      'provider.id',
      'listings.provider_id')
    .leftJoin(
      'organisations as recipient',
      'recipient.id',
      'listings.recipient_id')
    .select(
      'listings.id as id',
      'provider.name as providerName',
      'listings.provider_id as providerID',
      'provider.address as providerAddress',
      'provider.phone as providerPhone',
      'provider.type as providerType',
      'recipient.name as recipientName',
      'recipient.address as recipientAddress',
      'recipient.phone as recipientPhone',
      'recipient.type as recipientType',
      'recipient.id as recipientId',
      'listings.pick_up_date_time as pickupTime',
      'listings.use_by_date as itemExpiry',
      'listings.creation_date_time as createdAt',
      'listings.description as description',
      'listings.category_id as categoryId')
    .then(listings => {
      return listings
    })
}

function addListing (listing, conn) {
  const db = conn || connection
  return db('listings').insert([{
    provider_id: listing.providerId,
    recipient_id: listing.address,
    category_id: listing.categoryId,
    description: listing.description,
    pick_up_date_time: listing.pickupTime,
    use_by_date: listing.itemExpiry,
    creation_date_time: listing.createdAt
  }])
}

function getListingById (listingId, conn) {
  const db = conn || connection
  return db('listings')
    .leftJoin(
      'organisations as provider',
      'provider.id',
      'listings.provider_id')
    .leftJoin(
      'organisations as recipient',
      'recipient.id',
      'listings.recipient_id')
    .select(
      'listings.id as id',
      'provider.name as providerName',
      'listings.provider_id as providerID',
      'provider.address as providerAddress',
      'provider.phone as providerPhone',
      'provider.type as providerType',
      'recipient.name as recipientName',
      'recipient.address as recipientAddress',
      'recipient.phone as recipientPhone',
      'recipient.type as recipientType',
      'recipient.id as recipientId',
      'listings.pick_up_date_time as pickupTime',
      'listings.use_by_date as itemExpiry',
      'listings.creation_date_time as createdAt',
      'listings.description as description',
      'listings.category_id as categoryId')
    .where('listings.id', listingId)
    .first()
}

function getProviderById (id, conn) {
  const db = conn || connection
  return db('organisations')
    .select()
    .where('id', id)
    .first()
}

function updateListing (listingId, updList, conn) {
  const db = conn || connection
  return db('listings')
    .where('id', listingId)
    .update({
      recipient_id: updList.recipientId || null,
      description: updList.description,
      use_by_date: updList.date
    })
}

function getListingsByOrg (orgsId, conn) {
  const db = conn || connection
  return db('listings')
    .where('provider_id', orgsId)
}

function addOrganisation (userData, conn) {
  const db = conn || connection
  return db('organisations')
    .insert(userData)
}

function updateOrg (orgId, updOrg, conn) {
  const db = conn || connection
  return db('organisations')
    .where('id', orgId)
    .update({
      name: updOrg.name,
      address: updOrg.address,
      phone: updOrg.phone,
      type: updOrg.type
    })
}

function removeListing (listID, conn) {
  const db = conn || connection
  return db('listings')
    .where('id', listID)
    .del()
}

function removeOrg (orgId, conn) {
  const db = conn || connection
  return db('organisations')
    .where('id', orgId)
    .del()
}

function getOrg (id, conn) {
  const db = conn || connection
  return db('organisations')
    .where('auth0_id', id)
    .first()
}

module.exports = {
  getListings,
  getListingById,
  getListingsByOrg,
  addListing,
  updateListing,
  removeListing,
  addOrganisation,
  removeOrg,
  updateOrg,
  getOrg,
  getProviderById
}
